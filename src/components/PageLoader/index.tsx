import styled from 'styled-components/macro';
import { PulseLoader } from 'react-spinners';

interface Props {
  size?: number;
  backGroundColor?: string;
  color?: string;
  height?: string;
}
const PageLoader = ({ size, color, backGroundColor, height }: Props) => {
  return (
    <Container backgroundColor={backGroundColor} height={height}>
      <PulseLoader size={size || 50} color={color || '#000'} margin={10} />
    </Container>
  );
};

const Container = styled.div<{ height?: string; backgroundColor?: string }>`
  height: ${(props) => (props.height ? `${props.height}` : `100vh`)};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.backgroundColor ? `${props.backgroundColor}` : `white`};
`;

export default PageLoader;
