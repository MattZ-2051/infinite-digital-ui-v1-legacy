import Slider from 'react-slick';
import styled from 'styled-components/macro';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// Local
import Box from './Box';

export interface IProps {}

const FeatureBoxes: React.FC<IProps> = () => {
  const settings = {
    dots: true,
  };

  return (
    <OuterContainer>
      <Slider {...settings}>
        <Box />
        <Box />
        <Box />
      </Slider>
    </OuterContainer>
  );
};

const OuterContainer = styled.section`
  width: 100%;
  height: 720px;
  margin: auto;
  overflow-x: hidden;
`;

export default FeatureBoxes;
