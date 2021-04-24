import React from 'react';
import styled from 'styled-components/macro';

export interface IProps {
  size?: number;
}

const SquircleContainer: React.FC<IProps> = ({ children, size }) => {
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

      <Container>{children}</Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: url(#squircleClip);
  background-color: #373737;
  width: 200px;
  height: 200px;
  background: url('https://media-cdn.tripadvisor.com/media/photo-s/1a/6b/71/ff/pavoreal-beach-resort.jpg');
`;

export default SquircleContainer;
