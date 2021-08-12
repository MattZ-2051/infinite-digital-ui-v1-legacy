import SkuTile from 'views/MarketPlace/components/SkuTile';
import * as S from './styles';

const LatestReleases = ({ tiles }): JSX.Element => {
  return (
    <S.ProductContainer>
      {tiles &&
        tiles.map((el, index) => {
          if (index > 3) return null;
          return (
            <S.TileContainer key={index} index={index}>
              <SkuTile sku={el} key={index} themeStyle={'dark'} />
            </S.TileContainer>
          );
        })}
    </S.ProductContainer>
  );
};

export default LatestReleases;
