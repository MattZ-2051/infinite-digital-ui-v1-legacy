import React from 'react';
import styled from 'styled-components/macro';
import Button from 'components/Buttons/Button';
import { Sku } from 'entities/sku';

export interface IProps {
  product: Sku;
}

const SlideBox = ({ product }: IProps): JSX.Element => {
  return (
    <Container>
      <ImageContainer url="https://sneakernews.com/wp-content/uploads/2013/08/nike-lebron-11-beauty-shots-2.jpg" />
      {/**
       * This needs to be the following but the images look ugly
       * Needs to be an image with black background
       * <ImageContainer url={product.graphicUrl} /> */}

      <ProductDetails>
        <h5>MARKETPLACE FEATURE</h5>
        <div>SKU: {product._id} </div>

        <h2>{product.name}</h2>
        <h3>{product.description}</h3>
        <p>{product.totalSupplyLeft} for sale</p>
        <p style={{ marginBottom: '20px' }}>
          Listings from ${product.minSkuPrice} to ${product.minPrice}
        </p>

        <Button color="white">Get yours now</Button>
      </ProductDetails>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  max-width: 1440px;
  padding: 0 50px 0 50px;
  display: flex;
  align-items: center;
  margin: auto;

  @media screen and (max-width: 1280px) {
    padding: 0 32px 0 32px;
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    height: auto;
    padding: 50px 32px 60px 32px;
  }
`;

const ProductDetails = styled.div`
  display: inline-grid;
  grid-gap: 12px;
  height: auto;
  font-weight: 600;
  min-width: 340px;

  @media screen and (max-width: 960px) {
    min-width: 280px;
    font-size: 0.85rem;
    grid-gap: 10px;
  }

  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
  }

  p {
    margin: 0;
  }
`;

interface ImageContainerProps {
  readonly url: string;
}

const ImageContainer = styled.div<ImageContainerProps>`
  height: 720px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('${(props) => props.url}');
  width: calc(100% - 340px);
  background-size: contain;
  margin-right: 25px;

  @media screen and (max-width: 960px) {
    width: calc(100% - 280px);
    height: 540px;
  }

  @media screen and (max-width: 600px) {
    height: 250px;
    width: 100%;
    margin-bottom: 30px;
  }
`;

export default SlideBox;
