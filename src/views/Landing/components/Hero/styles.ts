import styled from 'styled-components/macro';
import { ReactComponent as RightArrow } from 'assets/svg/icons/landing-right-arrow.svg';

export const Container = styled.section`
  background-color: black;
  margin: auto;
  position: relative;
  display: flex;
  padding: 80px;
  flex-direction: row;
  text-align: center;
  color: white;
  padding-bottom: 100px;
  max-width: 1440px;
  @media screen and (max-width: 960px) {
    font-size: 0.9rem;
    padding: 24px;
    padding-bottom: 50px;
    flex-direction: column;
  }
`;

export const DropButtonContainer = styled.div<{
  paddingLeft: string;
  paddingTop: string;
}>`
  display: flex;
  align-items: center;
  padding-left: ${(props) => `${props.paddingLeft}`};
  padding-top: ${(props) => `${props.paddingTop}`};
`;

export const DropArrow = styled(RightArrow)`
  margin-left: 10px;
  fill: none;
  stroke: #9da1a8;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const DropButton = styled.span`
  font-size: 16px;
  color: #9da1a8;
  font-weight: 700;
  :hover {
    cursor: pointer;
  }
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

export const ImgContainer = styled.div`
  position: relative;
  @media screen and (max-width: 960px) {
    margin-bottom: 50px;
  }
`;

export const DropImg = styled.img`
  position: absolute;
  right: 0;
  left: 44%;
  top: 78%;
  width: 305px;
  @media screen and (max-width: 960px) {
    width: 235px;
    left: 38%;
  }
  @media screen and (max-width: 400px) {
    width: 230px;
    left: 35%;
  }
  @media screen and (max-width: 330px) {
    width: 210px;
    left: 30%;
  }
`;

export const SubContainer = styled.div<{ order: number; padding?: string }>`
  order: ${(props) => `${props.order}`};
  padding: ${(props) => `${props.padding}`};
`;

export const Title = styled.h1<{ fontSize: string }>`
  font-size: ${(props) => `${props.fontSize}`};
  font-weight: 700;
  margin: 0;
  // margin: 50px 0 24px 0;
  text-align: left;
  span {
    background: #ddf874;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  @media screen and (max-width: 600px) {
    margin: 44px 0 18px 0;
    font-size: 32px;
    text-align: center;
    span {
      font-size: 32px;
    }
  }
`;

export const Subtitle = styled.h2<{
  color: string;
  fontSize: string;
  fontWeight: number;
}>`
  font-weight: ${(props) => `${props.fontWeight}`};
  font-size: 18px;
  color: ${(props) => `${props.color}`};
  line-height: 32px;
  text-align: left;
  margin: 0;
  @media screen and (max-width: 600px) {
    // margin-bottom: 12%;
    text-align: center;
  }
`;

export const ArrowButton = styled.div`
  position: relative;
  position: absolute;
  bottom: 90px;
  display: flex;
  justify-content: center;
  svg {
    font-size: 10rem;
    position: absolute;
    cursor: pointer;
  }
  svg + svg {
    top: 29px;
    cursor: pointer;
  }
`;

export const Img = styled.img`
  width: 100%;
  max-width: 700px;
`;
