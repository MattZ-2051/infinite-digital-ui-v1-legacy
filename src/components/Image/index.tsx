import React from 'react';
import styled from 'styled-components/macro';

interface ImageProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  children?: JSX.Element;
}

export const Image = (props: ImageProps): JSX.Element => {
  const { src, alt, width, height, children } = props;

  // Import result is the URL of your image
  return (
    <img
      src={src}
      alt={alt}
      style={{ ...(width && { width }), ...(height && { height }) }}
    >
      {children && children}
    </img>
  );
};

const ImageContainer = styled.div<{ imageUrl?: string }>`
  background-image: ${(props) =>
    props.imageUrl
      ? 'url(' + props.imageUrl + ')'
      : 'url(https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png)'};
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface BackgroundImageContainerProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  children?: JSX.Element;
}

export const BackgroundImageContainer = (
  props: BackgroundImageContainerProps
): JSX.Element => {
  const { src, children, width, height } = props;

  if (src) {
    return (
      <ImageContainer style={{ width, height }} imageUrl={src}>
        {children && children}
      </ImageContainer>
    );
  } else {
    return <div style={{ width, height }}>{children && children}</div>;
  }
};
