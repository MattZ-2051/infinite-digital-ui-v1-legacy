import styled from 'styled-components/macro';
import Button from 'components/Buttons';

export const MainContainer = styled.div`
  background-color: black;
  flex: 1;
  display: flex;
  height: calc(100vh - 162px);
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 960px) {
      height:100vh;
  }
`;

export const GradientText = styled.div`
    font-size: 56px;
    line-height: 71px;
    font-weight: bold;
    background-clip: text;
    background: -webkit-linear-gradient(#E81CFF, #40C9FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-right: 10px;
`;

export const SecondaryContainer = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
`;

export const TextContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const MainText = styled.div`
  color: white;
  font-size: 56px;
  line-height: 71px;
  font-weight: bold;
  text-align: center;
`;

export const DescriptionText = styled.div`
  font-size: 18px;
  line-height: 32px;
  color: #8E8E8E;
  font-style: normal;
  margin-top: 10px;
  text-align: center;
`;

export const SButton = styled(Button)`
  padding: 10px 25px;
  margin-bottom: 30px;
  margin-top: 30px;
`;

export const Link = styled.a`
  color: white;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
`
