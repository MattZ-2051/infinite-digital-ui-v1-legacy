import React from 'react';
import styled from 'styled-components/macro';

export interface IProps {
  size?: number;
  bgColor?: string;
  [rest: string]: any;
}

const Squircle: React.FC<IProps> = ({ children, size, bgColor, ...rest }) => {
  return (
    <>
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        style={{
          position: 'absolute',
        }}
      >
        <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
          <path
            style={{
              fill: 'none',
            }}
            d="
            M 0,0.5
            C 0,0.13 0.13,0, 0.5,0
            S 1,0.13 1,0.5 0.87,1 0.5,1 0,0.87 0,0.5
            "
          />
        </clipPath>
      </svg>

      <Container {...rest} size={size} bgColor={bgColor}>
        {children}
      </Container>
    </>
  );
};

interface IContainer {
  size?: number;
  bgColor?: string;
}

const Container = styled.div<IContainer>`
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: url(#squircleClip);
  background-color: ${(props) => (props.bgColor ? props.bgColor : '#7d7d7d')};
  min-width: ${(props) => (props.size ? `${props.size}px` : '100px')};
  min-height: ${(props) => (props.size ? `${props.size}px` : '100px')};
`;

export default Squircle;
