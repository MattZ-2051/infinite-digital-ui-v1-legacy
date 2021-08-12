import styled from 'styled-components/macro';
import tswBack from 'assets/img/backgrounds/tsw-background.png';

export const BackgroundContainer = styled.section`
  background-color: black;
  width: 100%;
  position: relative;
  z-index: 10;
  overflow: hidden;
`;
export const Container = styled.section`
  max-width: 1140px;
  margin: auto;
  padding: 96px 80px 200px 80px;
  @media screen and (max-width: 1100px) {
    padding: 96px 24px 200px 24px;
  }
`;

export const BackdropWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  ::before {
    content: '';
    background-image: url(${tswBack});
    background-size: 145vw 81vw;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vw;
    z-index: -1;
  }

  @media screen and (min-width: 1100px) {
    ::before {
      background-size: 1427px 800px;
    }
  }
`;

export const Header = styled.h3`
  color: white;
  font-size: 64px;
  font-weight: 600;
  text-align: center;
  padding-top: 56px;
  line-height: 1.2;
  @media screen and (max-width: 460px) {
    font-size: 32px;
  }
`;

export const SubHeader = styled.h6`
  color: #9da1a8;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  line-height: 26px;
  padding-top: 32px;
`;

export const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 40px;
`;

export const Button = styled.button<{ width: string }>`
  width: ${(props) => `${props.width}`};
  height: 48px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  background-color: black;
  border: 1px solid #3a3a3a;
  border-radius: 35px;
  :focus {
    outline: none;
    border: none;
  }
  :hover {
    cursor: pointer;
    background-color: #ddf874;
    color: black;
  }
`;
