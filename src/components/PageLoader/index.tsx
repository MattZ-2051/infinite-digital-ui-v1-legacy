import styled from 'styled-components/macro';
import { PulseLoader } from 'react-spinners';

interface Props {
  size?: number;
  backGroundColor?: string;
  color?: string;
}
const PageLoader = ({ size, color, backGroundColor }: Props) => {
  return (
    <Container style={{ backgroundColor: backGroundColor || 'white' }}>
      <PulseLoader size={size || 50} color={color || '#000'} margin={10} />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default PageLoader;
