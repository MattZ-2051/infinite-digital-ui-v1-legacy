import * as S from '../styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const Title = ({ marketPlaceUrl, product }) => {
  const matchesMobile = useMediaQuery('(max-width:1140px)');

  return (
    <S.Title textAlign={matchesMobile ? 'center' : 'start'}>
      <div>
        <S.TitleLink to={marketPlaceUrl}>Marketplace</S.TitleLink> /{' '}
        <S.TitleLink to={`/marketplace/${product?.sku._id}`}>
          {product?.sku.name}
        </S.TitleLink>{' '}
        / #{product?.serialNumber}
      </div>
    </S.Title>
  );
};
