import React from 'react';
import * as CSS from 'csstype';
import InfiniteLogo from 'assets/img/logos/iso-black-512.jpeg';

interface ImageProps {
  src: string;
  fallbackImage?: string;
  alt?: string;
  styles: CSS.Properties;
  children?: JSX.Element;
}

export const Media = (props: ImageProps): JSX.Element => {
  const { src, styles, fallbackImage, children } = props;

  const onError = (ev) => {
    // Set fallback image
    ev.target.src = fallbackImage ? fallbackImage : InfiniteLogo;
  };

  return src?.endsWith('mov') || src?.endsWith('mp4') ? (
    <video
      src={src}
      style={{
        ...styles,
      }}
      autoPlay={true}
      controls={false}
      loop={true}
      muted={true}
      onError={onError}
    >
      {children && children}
    </video>
  ) : (
    <img style={{ ...styles }} src={src} onError={onError}>
      {children && children}
    </img>
  );
};
