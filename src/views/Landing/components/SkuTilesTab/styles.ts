import styled from 'styled-components/macro';

export const Container = styled.section`
  padding: 300px 40px 300px 40px;
  margin: auto;
  background-color: black;
  @media screen and (min-height: 1920px) {
    min-height: ${() => screen.height - 1500}px;
  }
  @media screen and (max-width: 960px) {
    height: 100%;
    padding: 200px 24px 200px 24px;
  }

  @media screen and (max-width: 340px) {
    padding: 200px 0px 200px 0px;
  }
`;

export const Header = styled.p`
  margin: 0;
  color: white;
  font-weight: 600;
  font-size: 48px;
  text-align: center;
  padding: 16px 0px 64px 0px;
  @media screen and (max-width: 460px) {
    font-size: 32px;
  }
`;

export const SubHeader = styled.p`
  margin: 0;
  font-size: 18px;
  color: #9da1a8;
  font-weight: 600;
  padding-bottom: 16px;
  text-align: center;
`;

export const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 48px;
  @media screen and (max-width: 960px) {
    padding: 32px 0 64px 0;
  }
`;

export const MarketPlaceButton = styled.button`
  border: 1px solid #3a3a3a;
  background-color: black;
  width: 272px;
  height: 48px;
  font-weight: 600;
  font-size: 16px;
  color: white;
  border-radius: 30px;
  transition: 0.3s;
  :focus {
    outline: none;
  }

  :hover {
    cursor: pointer;
    background: #ddf874;
    color: black;
    border: 1px solid black;
 
  }
`;
