import styled from 'styled-components/macro';
import heroImg from 'assets/img/backgrounds/hero-bg.jpeg';

export interface IProps {}

const Hero: React.FC<IProps> = () => {
  return (
    <Container>
      
    </Container>
  );
};

const Container = styled.section`
  height: 80vh;
  background-image: url(${heroImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 0 0 0 0;
`;

export default Hero;
