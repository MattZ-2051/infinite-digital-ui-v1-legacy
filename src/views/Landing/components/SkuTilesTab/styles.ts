import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const Container = styled.section`
  padding: 300px 40px 400px 40px;
  // height: 100vh;
  margin: auto;
  background-color: black;
  @media screen and (min-height: 1920px) {
    min-height: ${() => screen.height - 1500}px;
  }
  @media screen and (max-width: 960px) {
    height: 100%;
    padding: 240px 24px 324px 24px;
  }

  @media screen and (max-width: 340px) {
    padding: 240px 0 324px 0;
  }
`;

export const Header = styled.p`
  margin: 0;
  color: white;
  font-weight: 700;
  font-size: 48px;
  text-align: center;
  padding: 16px 0px 64px 0px;
`;

export const SubHeader = styled.p`
  margin: 0;
  font-size: 18px;
  color: #9da1a8;
  font-weight: 700;
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
  font-weight: 700;
  font-size: 16px;
  color: white;
  border-radius: 30px;
  :focus {
    outline: none;
  }

  :hover {
    cursor: pointer;
    background: white;
    color: black;
    border: 1px solid black;
  }
`;
