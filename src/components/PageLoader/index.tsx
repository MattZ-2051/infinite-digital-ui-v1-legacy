import styled from 'styled-components/macro';
import { PulseLoader } from 'react-spinners';

interface Props {
  size?: number;
}
const PageLoader = ({ size }: Props) => {
  return (
    <Container>
      <PulseLoader size={size || 50} color={'#000'} margin={10} />
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