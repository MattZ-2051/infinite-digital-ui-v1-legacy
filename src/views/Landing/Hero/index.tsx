import styled from 'styled-components/macro';

export interface IProps {}

const Hero: React.FC<IProps> = () => {
  return (
    <Container>
      <h2>Hero</h2>
    </Container>
  );
};

const Container = styled.section`
  padding: 0 0 0 0;
`;

export default Hero;
