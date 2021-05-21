import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components/macro';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SlideBox from './components/SlideBox';
import { SkuWithTotal } from 'entities/sku';
import { getFeaturedSkuTiles } from 'services/api/sku';
// import { ReactComponent as RightArrow } from 'assets/svg/icons/arrow-right.svg';
import RightArrow from 'assets/svg/icons/arrow-right-white.svg';

const FeaturedSlider = (): JSX.Element => {
  const [tiles, setTiles] = useState<SkuWithTotal>({ data: [], total: 0 });

  async function fetchProducts() {
    const skuTiles = await getFeaturedSkuTiles({
      queryParams: `&filter=${encodeURI(
        JSON.stringify({ sortBy: { startDate: 1 } })
      )}&featured=true`,
    });
    if (skuTiles) {
      setTiles(skuTiles);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    autoplay: true,
  };

  return (
    <Container>
      <Slider {...settings}>
        {tiles.data instanceof Array &&
          tiles.data.map((product, key) => (
            <SlideBox key={key} product={product} />
          ))}
      </Slider>
    </Container>
  );
};

const Container = styled.section`
  padding-bottom: 110px;
  color: white;
  background-color: black;

  .slick-dots {
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

  .slick-next:before {
    content: url(${RightArrow});
  }

  .slick-prev:before {
    content: url(${RightArrow});
    transform: rotate(180deg);
    display: block;
  }
`;

export default FeaturedSlider;
