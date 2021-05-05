import React from 'react';
import styled from 'styled-components/macro';
// Local
import Button from 'components/Buttons/Button';
// Icons
import ariaImg from 'assets/img/backgrounds/aria-landing-top.png';

interface IProps {
  login: () => void;
  isAuthenticated: boolean;
}

const scrollToProducts = () => {
  const FeaturedBoxNode = document.querySelector('#feature-products')!;
  FeaturedBoxNode.scrollIntoView({ behavior: 'smooth' });
};

const Hero: React.FC<IProps> = ({ login, isAuthenticated }: IProps) => {
  return (
    <Container>
      {!isAuthenticated && (
        <Button
          color="white"
          onClick={() => login()}
          data-testid="start-collection-btn"
        >
          START YOUR COLLECTOY TODAY
        </Button>
      )}
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 135px);
  background-image: url(${ariaImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  text-align: center;
  padding: 0 0 0 0;
  color: white;

  @media screen and (max-width: 960px) {
    font-size: 0.9rem;
  }
`;

const Title = styled.h1`
  margin-bottom: 32px;

  @media screen and (max-width: 600px) {
    margin-bottom: 10%;
  }

  @media screen and (max-width: 600px) {
    word-spacing: 100vw;
    span {
      display: none;
    }
  }
`;

const Subtitle = styled.h2`
  font-weight: 500;
  font-size: 2.3em;
  margin-bottom: 32px;

  @media screen and (max-width: 600px) {
    margin-bottom: 12%;
  }
`;

const ArrowButton = styled.div`
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

export default Hero;
