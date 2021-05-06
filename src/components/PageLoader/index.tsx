import styled from 'styled-components/macro';
import { PulseLoader } from 'react-spinners';

const PageLoader = () => {
  return (
    <Container>
      <PulseLoader size={50} color={'#000'} margin={10} />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default PageLoader;
