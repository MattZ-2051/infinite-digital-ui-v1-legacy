import { useEffect, useState } from 'react';
import { Sku } from 'entities/sku';
import { getSkuTiles } from 'services/api/sku';
import SkuTile from 'views/MarketPlace/components/SkuTile';
import * as S from './styles';
import PageLoader from 'components/PageLoader';

const LatestReleases = (): JSX.Element => {
  const [tiles, setTiles] = useState<Sku[] | []>([]);
  const [themeStyle, setTheme] = useState<'light' | 'dark'>('light');

  // List only different users
  const filteredByUser = (tiles: Sku[]) => {
    const filteredTiles: Sku[] = [];
    const selectedIssuers: string[] = [];
    for (const tile of tiles) {
      if (filteredTiles.length === 4) break;
      if (!selectedIssuers.includes(tile.issuerName)) {
        selectedIssuers.push(tile.issuerName);
        filteredTiles.push(tile);
      }
    }
    return filteredTiles;
  };

  async function fetchProducts() {
    const skuTiles = await getSkuTiles({
      queryParams: '?page=1&per_page=50',
    });
    if (skuTiles.data) {
      setTiles(filteredByUser(skuTiles.data));
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (tiles.length === 0) return <PageLoader size={40} height="60vh" />;
  return (
    <S.ProductContainer>
      {tiles &&
        tiles.map((el, index) => {
          if (index > 3) return null;
          return (
            <S.TileContainer key={index} index={index}>
              <SkuTile sku={el} key={index} themeStyle={themeStyle} />
            </S.TileContainer>
          );
        })}
    </S.ProductContainer>
  );
};

export default LatestReleases;
