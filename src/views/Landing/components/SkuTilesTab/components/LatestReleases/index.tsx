import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Sku } from 'entities/sku';
import { getSkuTiles } from 'services/api/sku';
import SkuTile from 'views/MarketPlace/components/SkuTile';

const LatestReleases = (): JSX.Element => {
  const [tiles, setTiles] = useState<Sku[] | []>([]);
  const [themeStyle, setTheme] = useState<'light' | 'dark'>('light');

  const filterFeatured = (tiles: Sku[]) => {
    const filteredTiles: Sku[] = [];
    for (const tile of tiles) {
      if (filteredTiles.length === 4) break;
      if (!tile.featured) {
        filteredTiles.push(tile);
      }
    }
    return filteredTiles;
  };

  async function fetchProducts() {
    const skuTiles = await getSkuTiles();
    if (skuTiles.data) {
      setTiles(filterFeatured(skuTiles.data));
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContainer>
      {tiles &&
        tiles.map((el, index) => {
          return (
            <TileContainer key={index} index={index}>
              <SkuTile sku={el} key={index} themeStyle={themeStyle} />
            </TileContainer>
          );
        })}
    </ProductContainer>
  );
};

const TileContainer = styled.div<{ index: number }>`
  padding: 0 20px;
  padding-left: ${({ index }) => `${index === 0 ? '0px' : '10px'}`};
`;

const ProductContainer = styled.div`
  && {
    display: grid;
    grid-gap: 48px;
    grid-template-columns: repeat(auto-fit, 300px);
    justify-content: flex-start;

    @media screen and (max-width: 1200px) {
      justify-content: center;
    }

    @media screen and (max-width: 600px) {
      justify-content: center;
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
export default LatestReleases;
