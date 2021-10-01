import React, { useEffect, useRef } from 'react';
import * as three from "three";

function isWebGLAvailable() {
  const canvas = document.createElement('canvas');
  let isAvail;
  try {
    isAvail = Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch ( e ) {
    isAvail = false;
  }
  return isAvail;
}

const FRAGMENT_SHADER = `
uniform vec3 color;
void main() {
  if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
  gl_FragColor = vec4( color, 1.0 );
}
`;

const VERTEX_SHADER = `
attribute float scale;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_PointSize = scale * ( 300.0 / - mvPosition.z );
  gl_Position = projectionMatrix * mvPosition;
}
`;
const SEPARATIONX = 70;
const SEPARATIONY = 70;
const AMOUNTX = 50;
const AMOUNTY = 50;
// const ASPECT_RATIO = 0.2;
const ASPECT_RATIO = 3;

const Waves = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(
    () => {
      if (!isWebGLAvailable()) {
        return;
      }
      if (!containerRef?.current) {
        return;
      }

      const container = containerRef?.current;
      let camera;
      let scene;
      let renderer;

      let particles
      let count = 0;

      function init() {
        camera = new three.PerspectiveCamera(25, ASPECT_RATIO, 10, 3000);
        // camera.position.z = 1000;
        camera.position.y = 500;
        camera.position.z = (SEPARATIONY * AMOUNTY / 2) * 0.8;
        camera.position.x = (SEPARATIONX * AMOUNTX / 2) * 0.8;

        scene = new three.Scene();

        const numParticles = AMOUNTX * AMOUNTY;

        const positions = new Float32Array(numParticles * 3);
        const scales = new Float32Array(numParticles);

        let i = 0, j = 0;

        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            positions[i] = ix * SEPARATIONX - ((AMOUNTX * SEPARATIONX) / 2); // x
            positions[i + 1] = 0; // y
            positions[i + 2] = iy * SEPARATIONY - ((AMOUNTY * SEPARATIONY) / 2); // z
            scales[j] = 1;
            i += 3;
            j++;
          }
        }

        const geometry = new three.BufferGeometry();
        geometry.setAttribute('position', new three.BufferAttribute(positions, 3));
        geometry.setAttribute('scale', new three.BufferAttribute(scales, 1));

        const material = new three.ShaderMaterial({
          uniforms: {
            color: {value: new three.Color(0x666666)},
          },
          vertexShader: VERTEX_SHADER,
          fragmentShader: FRAGMENT_SHADER,
        });

        particles = new three.Points(geometry, material);
        scene.add(particles);

        renderer = new three.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerWidth / ASPECT_RATIO);
        container.appendChild(renderer.domElement);
        container.style.touchAction = 'none';
        window.addEventListener('resize', onWindowResize);
        return () => {
          geometry.dispose();
          material.dispose();
        };
      }

      function onWindowResize() {
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerWidth / ASPECT_RATIO );
      }

      function animate() {
        requestAnimationFrame( animate );
        render();
      }

      function render() {
        // camera.position.x += camera.position.x * 10000;
        // camera.position.y += camera.position.y * .05;
        camera.lookAt( scene.position );

        const positions = particles.geometry.attributes.position.array;
        const scales = particles.geometry.attributes.scale.array;

        let i = 0, j = 0;

        for ( let ix = 0; ix < AMOUNTX; ix ++ ) {
          for ( let iy = 0; iy < AMOUNTY; iy ++ ) {
            positions[ i + 1 ] = ( Math.sin( ( ix + count ) * 0.25 ) * 50 ) +
              ( Math.cos( ( iy + count ) * 0.25 ) * 50 );
            scales[ j ] = ( Math.sin( ( ix + count ) * 0.25 ) + 1 ) * 7 +
              ( Math.cos( ( iy + count ) * 0.25 ) + 1 ) * 7;
            i += 3;
            j ++;
          }
        }

        particles.geometry.attributes.position.needsUpdate = true;
        particles.geometry.attributes.scale.needsUpdate = true;

        renderer.render( scene, camera );
        count += 0.1;
      }

      const cleanup = init();
      animate();

      return () => {
        window.removeEventListener('resize', onWindowResize);
        cleanup();
        renderer.dispose();
      };
    },
    [],
  );
  return (
    <div ref={containerRef} {...props}/>
  );
};

export default Waves;
