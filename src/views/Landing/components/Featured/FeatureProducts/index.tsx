import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components/macro';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SlideBox from './SlideBox';
import { SkuWithTotal } from 'entities/sku';
import { getFeaturedSkuTiles } from 'services/api/sku';

const FeatureProducts = () => {
  const [tiles, setTiles] = useState<SkuWithTotal>({ data: [], total: 0 });

  async function fetchProducts() {
    const skuTiles = await getFeaturedSkuTiles();
    if (skuTiles) {
      setTiles(skuTiles);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const settings = {
    dots: true,
  };

  return (
    <Container id="feature-products">
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
