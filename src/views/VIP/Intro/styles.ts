import styled from 'styled-components/macro';
import { Link as LinkComponent } from 'react-router-dom';
import { ReactComponent as InfiniteLogo } from 'assets/svg/logos/infinite-logo-by-suku.svg';
import { ReactComponent as Lines } from 'assets/VIPLanding/lines.svg';
import GlassyCard from './Assets/glassy-card.png';

export const SignSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 750px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
export const Gradient1 = styled.div`
  height: 38.56rem;
  width: 38.56rem;
  max-width: 100%;
  position: absolute;
  z-index: 2;
  top: 16%;
  left: 23%;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(221, 248, 116, 0.18) 0%,
    rgba(221, 248, 116, 0) 100%
  );
  @media (max-width: 850px) {
    max-width: 90%;
    left: 10%;
  }
`;
export const Gradient2 = styled.div`
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(116, 248, 185, 0.12) 0%,
    rgba(116, 248, 185, 0) 100%
  );
  position: absolute;
  max-width: 100%;
  z-index: 2;
  height: 57rem;
  width: 57rem;
  left: 34%;
  top: 10%;
  @media (max-width: 1400px) {
    max-width: 90%;
    left: 10%;
  }
`;
export const Gradient3 = styled.div`
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(109, 40, 255, 0.06) 0%,
    rgba(109, 40, 255, 0) 100%
  );
  position: absolute;
  max-width: 100%;
  height: 23rem;
  z-index: 2;
  width: 23rem;
  top: 48%;
  left: 36%;
  @media (max-width: 600px) {
    max-width: 90%;
    left: 10%;
  }
`;
export const Infinite = styled(InfiniteLogo)`
  fill: white;
  width: 100%;
`;
export const VideoScreen = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 14px;
`;
export const SubScreen = styled.div`
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  max-width: 41rem;
  opacity: 0.6;
  @media (max-width: 750px) {
    text-align: left;
    margin-bottom: 3rem;
  }
`;

export const LastText = styled.div`
  font-style: italic;
  margin-bottom: 3rem;
  opacity: 0.4;
  font-size: 0.9rem;
  text-align: center;
`;

export const SignUp = styled.div`
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  @media (max-width: 750px) {
    margin-bottom: 1rem;
  }
`;
export const BgContainer = styled.div`
  display: flex;
  justify-contet: center;
`;
export const ScreenBG = styled.div`
  width: 45rem;
  height: auto;
  border-radius: 20px;
  background-image: url(${GlassyCard});
  background-repeat: no-repeat;
  padding: 0.9rem;
  @media (max-width: 750px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    padding: 0.4rem;
    padding-top: 0.4rem;
    padding-bottom: 0.1rem;
  }
`;
export const Title = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 4.41rem;
  text-align: center;
  margin-top: 5.5rem;
  color: #ddf874;
  @media (max-width: 750px) {
    font-size: 2.5rem;
    line-height: 3rem;
    margin-top: 2.5rem;
  }
`;
export const SubTitle = styled.div`
  padding-top: 1rem;
  font-size: 2.12rem;
  text-align: center;
  margin-bottom: 3.3rem;
  @media (max-width: 750px) {
    font-size: 1.4rem;
    line-height: 1.5rem;
  }
`;
export const OnTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
`;
export const BodyContainer = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  position: relative;
  z-index: 10;
`;
export const BgImage = styled(Lines)`
  position: absolute;
  width: 100%;
  z-index: 1;
`;
export const Button1 = styled.button`
  padding: 0.6rem 2rem 0.6rem 2rem;
  color: white;
  background-color: transparent;
  border-radius: 99px;
  border: 1px solid #3a3a3a;
  min-width: max-content;
  font-weight: 700;
  :hover {
    background-color: #ddf874;
    color: black;
    cursor: pointer;
  }
  @media (max-width: 750px) {
    padding: 0.6rem 0.6rem 0.6rem 0.5rem;
  }
`;

export const Button2 = styled.button`
  padding: 0.6rem 2rem 0.6rem 2rem;
  color: white;
  background-color: transparent;
  border-radius: 99px;
  font-weight: 700;
  border: 1px solid #3a3a3a;
  :hover {
    background-color: #ddf874;
    color: black;
    cursor: pointer;
  }
  @media (max-width: 750px) {
    width: 100%;
  }
`;

export const Background = styled.div`
  background-color: black;
  color: white;
  padding-bottom: 10rem;
  @media (max-width: 750px) {
    padding-bottom: 4rem;
  }
`;
export const Header = styled.header`
  position: relative;
  z-index: 3;
  background-color: black;
`;

export const MainContainer = styled.div`
  min-height: calc(100vh - 128px);
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderContent = styled.div`
  max-width: 1680px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
  padding: 0 3rem 0 3rem;
  @media screen and (max-width: 960px) {
    padding: 0 1.5rem 0 1.5rem;
  }
  @media screen and (max-width: 500px) {
    padding: 0 0.3rem 0 0.3rem;
  }
`;

export const Link = styled(LinkComponent)`
  && {
    color: white;
  }
`;
