import Slider from 'react-slick';
import styled from 'styled-components/macro';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useAppSelector } from 'hooks/store';
// Local
import SlideBox from './SlideBox';

const FeatureProducts = () => {
  const { listings } = useAppSelector((state) => state.listings);

  const settings = {
    dots: true,
  };

  return (
    <Container>
      <Slider {...settings}>
        {listings instanceof Array &&
          listings.map((product) => <SlideBox product={product} />)}
      </Slider>
    </Container>
  );
};

const Container = styled.section`
  overflow-x: hidden;
  color: white;
  background-color: black;

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

    li.slick-active button:before {
      opacity: 1;
      color: #ffffff !important;
    }

    li button:before {
      opacity: 0.4;
      color: #ffffff;
    }
  }
`;

export default FeatureProducts;
