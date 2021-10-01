import styled from 'styled-components/macro';
import Waves from "./Waves";

export const Container = styled.div`
  background: black;
  padding: 0px 80px 0px 80px;
  max-width: 1440px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  @media screen and (max-width: 768px) {
    height: 80vh;
  }
`;

export const StyledWaves = styled(Waves)`
  height: 20vh;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    display: none;
  }
  position: relative;
  canvas {
    position: absolute;
    top: -10vh; 
  }
`;

export const Text = styled.p<{ color: string }>`
  margin: 0;
  font-size: 54px;
  font-weight: 600;
  color: ${(props) => `${props.color}`};
  text-align: center;
  @media screen and (max-width: 640px) {
    font-size: 36px;
  }
`;

export const SubText = styled.p`
  font-size: 16px;
  color: #7c7c7c;
`;
