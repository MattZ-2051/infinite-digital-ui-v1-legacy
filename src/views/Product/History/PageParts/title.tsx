import * as S from '../styles';

export const Title = ({ marketPlaceUrl, product }) => {
  return (
    <S.Title>
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
