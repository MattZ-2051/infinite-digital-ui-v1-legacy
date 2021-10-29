import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: black;
`;

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  padding: 0px 80px 0px 80px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledBackgroundVideo = styled.video`
  position: absolute;
  opacity: 50%;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
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
