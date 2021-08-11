import styled from 'styled-components/macro';

export const BackgroundContainer = styled.section`
  background-color: black;
  width: 100%;
`;
export const Container = styled.section`
  max-width: 1140px;
  // background: -webkit-linear-gradient(#000000 0%);
  // background: -webkit-linear-gradient(
  //     270deg,
  //     #000000 0%,
  //     rgba(0, 0, 0, 0) 31.85%
  //   ),
  //   -webkit-linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%),
  //   -webkit-linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 50%),
  //   -webkit-linear-gradient(180deg, #000000 -3.32%, #677436 49.93%);
  margin: auto;
  padding: 96px 80px 0px 80px;
  @media screen and (max-width: 1100px) {
    padding: 96px 24px 0px 24px;
  }
`;

export const Header = styled.h3`
  color: white;
  font-size: 64px;
  font-weight: 600;
  text-align: center;
  padding-top: 56px;
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
