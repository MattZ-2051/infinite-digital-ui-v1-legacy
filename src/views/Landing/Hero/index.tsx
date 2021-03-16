import styled from 'styled-components/macro';
import Button from 'components/Button';
import heroImg from 'assets/img/backgrounds/hero-bg.jpeg';

export interface IProps {}

const Hero: React.FC<IProps> = () => {
  return (
    <Container>
      <Title>Collect - Connect - Curate</Title>
      <Subtitle>Your home for premium NFT collectibles</Subtitle>
      <Button type="button" color="white">
       START YOUR COLLECTOY TODAY
      </Button>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  background-image: url(${heroImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  text-align: center;
  padding: 0 0 0 0;
  color: white;

  @media screen and (max-width: 960px) {
    font-size: 0.9rem;
  }

  @media screen and (max-width: 600px) {
    font-size: 0.5rem;
  }
`;

const Title = styled.h1`
  margin-bottom: 15px;

  @media screen and (max-width: 600px) {
    font-weight: 600;
  }
`;

const Subtitle = styled.h2`
  font-weight: 500;
  font-size: 2.3em;
  margin-bottom: 32px;
`;

export default Hero;
