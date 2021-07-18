import styled from 'styled-components/macro';
import { ReactComponent as RightArrow } from 'assets/svg/icons/landing-right-arrow.svg';

export const Container = styled.section`
  background-color: black;
  position: relative;
  display: flex;
  padding: 80px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

export const DropButtonContainer = styled.div<{ paddingLeft: string }>`
  display: flex;
  align-items: center;
  padding-left: ${(props) => `${props.paddingLeft}`};
`;

export const DropArrow = styled(RightArrow)`
  margin-left: 10px;
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

export const Button = styled.button`
  width: 179px;
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
  }
`;

export const ImgContainer = styled.div`
  position: relative;
  @media screen and (max-width: 960px) {
    margin-bottom: 50px;
  }
`;

export const ShoeImg = styled.img`
  position: absolute;
  right: 0;
  left: 30%;
  top: 75%;

  @media screen and (max-width: 960px) {
    width: 235px;
  }
`;

export const SubContainer = styled.div<{ order: number }>`
  order: ${(props) => `${props.order}`};
`;

export const Title = styled.h1`
  font-size: 56px;
  font-weight: 700;
  margin: 50px 0 24px 0;
  text-align: left;

  span {
    background: #ddf874;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media screen and (max-width: 600px) {
    margin: 50px 0 24px 0;
    font-size: 32px;
    margin-bottom: 10%;
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
  margin-bottom: 32px;
  line-height: 32px;
  text-align: left;

  @media screen and (max-width: 600px) {
    margin-bottom: 12%;
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
