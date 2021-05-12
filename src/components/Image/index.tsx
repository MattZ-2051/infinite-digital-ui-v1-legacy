import React from 'react';
import styled from 'styled-components/macro';
import * as CSS from 'csstype';
interface ImageProps {
  src: string;
  alt?: string;
  children?: JSX.Element;
  styles?: CSS.Properties;
}

export const Image = (props: ImageProps): JSX.Element => {
  const { src, alt, styles, children } = props;

  // Import result is the URL of your image
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        ...styles,
      }}
    >
      {children && children}
    </img>
  );
};

export const ImageContainer = styled.div<{ src?: string }>`
  background-image: ${({ src }) =>
    src
      ? 'url(' + src + ')'
      : 'url(https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png)'};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface BackgroundImageContainerProps {
  src?: string;
  alt?: string;
  children?: JSX.Element;
  styles?: CSS.Properties;
}

export const BackgroundImageContainer = (
  props: BackgroundImageContainerProps
): JSX.Element => {
  const { src, children, styles } = props;

  if (src) {
    return (
      <ImageContainer style={{ ...styles }} src={src}>
        {children && children}
      </ImageContainer>
    );
  } else {
    return <div style={{ ...styles }}>{children && children}</div>;
  }
};
