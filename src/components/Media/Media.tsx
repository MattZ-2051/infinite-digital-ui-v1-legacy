import React, { useEffect, useRef } from 'react';
import * as CSS from 'csstype';
import InfiniteLogo from 'assets/img/logos/iso-black-512.jpeg';
import styled from 'styled-components/macro';

interface ImageProps {
  src: string;
  fallbackImage?: string;
  alt?: string;
  styles: CSS.Properties;
  children?: JSX.Element;
}

export const Media = (props: ImageProps): JSX.Element => {
  const { src, styles, fallbackImage, children } = props;
  const image = src ? src : InfiniteLogo;
  const onError = (ev) => {
    // Set fallback image
    ev.target.src = fallbackImage ? fallbackImage : InfiniteLogo;
  };
  const vidRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    vidRef.current?.play();
    return () => {
      vidRef.current?.pause();
    };
  }, []);

  return src?.endsWith('mov') || src?.endsWith('mp4') ? (
    <video
      ref={vidRef}
      src={src}
      style={{
        ...styles,
      }}
      playsInline
      autoPlay={true}
      controls={false}
      loop={true}
      muted={true}
      onError={onError}
    >
      {children && children}
    </video>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <Img style={{ ...styles }} src={image} onError={onError}>
        {children && children}
      </Img>
    </div>
  );
};

const Img = styled.img`
  height: 469px;
  width: 469px;
  border-radius: 50%;
  @media screen and (max-width: 940px) {
    width: 250px;
    height: 250px;
    border-radius: 50%;
  }
  @media screen and (max-width: 640px) {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
`;
