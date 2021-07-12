import { PulseLoader } from 'react-spinners';

interface Props {
  size?: number;
  color?: string;
  margin?: number;
  height?: string;
}

const Loader = ({
  size = 50,
  color = '#000',
  margin = 10,
  height = '30px',
}: Props) => {
  return (
    <div style={{ height: height }}>
      <PulseLoader size={size} color={color} margin={margin} />
    </div>
  );
};

export default Loader;
