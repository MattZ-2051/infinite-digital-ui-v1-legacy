import Slider from 'react-slick';
import styled from 'styled-components/macro';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// Local
import SliderBox from './SliderBox';

export interface IProps {}

const FeatureBoxes: React.FC<IProps> = () => {
  const settings = {
    dots: true,
  };

  return (
    <Container id="feature-products">
      <Slider {...settings}>
        <SliderBox />
        <SliderBox />
        <SliderBox />
      </Slider>
    </Container>
  );
};

const Container = styled.section`
  overflow-x: hidden;

  .slick-dots {
    bottom: 25px;
    text-align: left;
    max-width: 1440px;
    margin: auto;
    padding: 0 50px 0 50px;
    position: relative;

    @media screen and (max-width: 1280px) {
      padding: 0 32px 0 32px;
    }

    @media screen and (max-width: 600px) {
      text-align: center;
    }
  }
`;

export default FeatureBoxes;
