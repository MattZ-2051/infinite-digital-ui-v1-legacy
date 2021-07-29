import styled from 'styled-components/macro';
import { ReactComponent as RightArrow } from 'assets/svg/icons/landing-right-arrow.svg';

export const Container = styled.div`
  height: 550px;
  display: grid;
  grid-template-columns: 606px 100%;
  @media screen and (max-width: 1100px) {
    display: flex;
    height: fit-content;
    flex-direction: column;
    width: 100%;
    overflow: auto;
  }
}
`;

export const LeftTextSection = styled.div`
  padding: 40px 40px 0px 40px;
  margin: 0;
  height: 464px;
  @media screen and (max-width: 1100px) {
    height: 100%;
    padding: 20px 20px 0px 20px;
  }
`;

export const RightImgSection = styled.img`
  height: 100%;
  object-fit: cover;
  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`;

export const FlexDiv = styled.div<{
  justifyContent: string;
  alignItems: string;
  padding?: string;
  flexDirection?: string;
}>`
  display: flex;
  justify-content: ${(props) => `${props.justifyContent}`};
  align-items: ${(props) => `${props.alignItems}`};
  padding: ${(props) => `${props.padding}`};
  @media screen and (max-width: 1100px) {
    flex-direction: ${(props) => `${props.flexDirection}`};
  }
`;

export const Text = styled.p<{
  fontColor: string;
  fontWeight: number;
  fontSize: string;
  padding?: string;
  textAlign?: string;
  background?: string;
  lineHeight?: string;
}>`
  margin: 0;
  color: ${(props) => `${props.fontColor}`};
  font-size: ${(props) => `${props.fontSize}`};
  font-weight: ${(props) => `${props.fontWeight}`};
  padding: ${(props) => `${props.padding}`};
  text-align: ${(props) => `${props.textAlign}`};
  line-height: ${(props) => `${props.lineHeight}`};
`;

export const Arrow = styled(RightArrow)`
  fill: none;
  stroke: black;
`;

export const GreyLowerSectionText = styled.p`
  margin: 0;
  color: black;
  opacity: 0.48;
  font-weight: 500;
  font-size: 12px;
  padding: 24px 48px;
  line-height: 19.2px;
  @media screen and (max-width: 1100px) {
    padding: 12px 24px;
  }
`;

export const LowerLeftSection = styled.div`
  background-color: #efefef;
  height: 86px;
  width: 100%;
  @media screen and (max-width: 1100px) {
    height: 85px;
  }
`;

export const Button = styled.button<{
  background: string;
  color: string;
}>`
  outline: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  height: 48px;
  width: 179px;
  border-radius: 30px;
  color: ${(props) => `${props.color}`};
  :hover {
    cursor: pointer;
  }
  background: ${(props) => `${props.background}`};

  @media screen and (max-width: 1100px) {
    width: 100%;
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;
