import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CircularButton from 'components/Buttons/CircularButton';
import { SkuWithFunctions } from 'entities/sku';
import { getFeaturedSkuTiles } from 'services/api/sku';
import ProductTile from 'views/MarketPlace/components/ProductTile';

const MarketPlace = () => {
  // const { listings } = useAppSelector((state) => state.listings);
  const [tiles, setTiles] = useState<SkuWithFunctions[]>([]);

  useEffect(() => {
    async function fetchData() {
      const skuTiles = await getFeaturedSkuTiles();
      if (skuTiles) {
        setTiles(skuTiles.data);
      }
    }
    fetchData();
  });

  return (
    <>
      <HeaderContainer>
        <Header>Latest Products</Header>
        <CircularButton to="marketplace" label="See More" />
      </HeaderContainer>
      <ProductContainer>
        {tiles &&
          tiles.map((el, index) => {
            if (index >= 16) return null;
            return (
              <TileContainer key={index} index={index}>
                <ProductTile
                  sku={el}
                  redeemable={true}
                  status="tbd"
                  productSerialNumber="1"
                  // TODO: get issuer name
                  // backend response returns issuer ID in product.listing
                  issuer={'adidas'}
                  key={index}
                  // TODO: Find out why this is not a Date
                  purchasedDate="1k"
                />
              </TileContainer>
            );
          })}
      </ProductContainer>
    </>
  );
};

const TileContainer = styled.div<{ index: number }>`
  padding: 0 20px;
  float: left;
  padding-left: ${({ index }) => `${index === 0 ? '0px' : '10px'}`};
`;

const ProductDiv = styled(({ first, ...rest }) => <div {...rest} />)`
  padding: ${(props) => (props.first ? '0 24px 0 0' : '0 24px')};
`;

const HeaderContainer = styled.div`
  @media screen and (max-width: 600px) {
    display: flex;
    align-items: center;
    margin: auto;
  }
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding-bottom: 28px;
`;

const Header = styled.h3`
  padding-top: 40px;
  font-size: 32px;
  line-height: 51.2px;
  @media screen and (max-width: 600px) {
    padding: 0;
  }
`;

const ProductContainer = styled.div`
  && {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    height: 36em;

    @media screen and (max-width: 600px) {
      margin: auto;
      width: 320px;
    }

    ::-webkit-scrollbar {
      height: 0.4em;
    }
    ::-webkit-scrollbar-button {
      width: 0.1em;
    }
    ::-webkit-scrollbar-track-piece {
    }
    ::-webkit-scrollbar-thumb {
      background: var(--grey-40);
      width: 1px !important;
      border-radius: 10px;
    }
  }
`;
export default MarketPlace;
