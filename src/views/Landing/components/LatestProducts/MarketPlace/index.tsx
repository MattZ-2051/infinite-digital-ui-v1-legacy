import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CircularButton from 'components/Buttons/CircularButton';
import { SkuWithTotal } from 'entities/sku';
import { getFeaturedSkuTiles } from 'services/api/sku';
import SkuTile from 'views/MarketPlace/components/SkuTile';

const MarketPlace = () => {
  // const { listings } = useAppSelector((state) => state.listings);
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

  return (
    <>
      <HeaderContainer>
        <Header>Latest Products</Header>
        <CircularButton to="marketplace" label="See More" />
      </HeaderContainer>
      <ProductContainer>
        {tiles &&
          tiles.data.map((el, index) => {
            if (index >= 16) return null;
            return (
              <TileContainer key={index} index={index}>
                <SkuTile sku={el} key={index} />
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
