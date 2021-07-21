import styled from 'styled-components/macro';
import { ReactComponent as copySVG } from 'assets/svg/icons/copy-to-clipboard-icon.svg';
import { ReactComponent as checkSVG } from 'assets/svg/icons/check.svg';

export const BodyContainer = styled.div`
  position: initial;
  /*max-width: 900px;*/
  min-width: 522px;
  /*min-height: 551px;*/
  /*max-height: 750px;*/
  background-color: white;
  padding-top: 16px;
  outline: none;
  border-radius: 10px;
  transform: translate(0);
  @media screen and (max-width: 550px) {
    width: 90%;
    min-width: unset;
  }
`;

export const BodyHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 2px solid black;
  padding-bottom: 14px;
  margin: 0 46px;
  @media screen and (max-width: 550px) {
    margin: 0 10px;
  }
`;

export const Header = styled.span`
  font-size: 22px;
  font-weight: 600;
  border-bottom: 2px solid black;
  padding-bottom: 14px;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
`;

export const BodyContent = styled.div`
  padding: 0 46px 46px 46px;
  margin-top: 40px;
  > * + * {
    margin-top: 32px;
  }`;


export const ContentInformation = styled.div`
  text-align: center;
`

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
      margin-top: 0;
      margin-bottom: 0;
      line-height: 160%;
      color: #9E9E9E;
      font-size: 16px;
      font-weight: 400;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`;

export const AddressButton = styled.button`
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  border-radius: 22px;
  align-items: center;
  padding: 15px 22px;
  border: 0;
  width: 100%;

  :hover {
    cursor: pointer;
  }

  :hover svg {
    fill: #9e9e9e;
  }

  @media screen and (min-width: 420px) {
    flex-direction: row;
  }
  span {
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
  }
  .account-address {
    @media screen and (min-width: 420px) {
      margin-left: auto;
    }
    display: flex;
    flex-direction: row;
    align-items: center;
    svg {
      margin-left: 10px;
    }
  }
`;

export const CopyIcon = styled(copySVG)`
  width: 19px;
  height: 22px;
  fill: black;
  :hover {
    fill: #9e9e9e;
    cursor: pointer;
  }
`;

export const CheckIcon = styled(checkSVG)`
  width: 19px;
  height: 19px;
  fill: black;
`;

export const InfoText = styled.p`
  font-size: 12px;
  color: #9E9E9E;
  font-weight: 400;
`;


export const ReturnButton = styled.button`
  background-color: white ;
  display: flex;
  flex-direction: column;
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  padding: 15px 22px;
  border: 0;
  width: 100%;  
  @media screen and (min-width: 420px) {
    flex-direction: row;
  }
  span {
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
  }
  :hover {
    cursor: pointer;
  }
  
`