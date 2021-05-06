import { ProductWithFunctions } from 'entities/product';
import ImageGallery from 'components/ImageGallery';
import Rarity from 'components/Rarity';
import { useAppSelector } from 'store/hooks';
import { useHistory } from 'react-router-dom';
import { skuFactory } from 'store/sku/skuFactory';
import * as S from './styles';
import { useAuth0 } from '@auth0/auth0-react';

interface Props {
  product: ProductWithFunctions | null;
}

const ProductDetails = ({ product }: Props) => {
  //TODO: add backend changes for sku series name and series name for series
  const loggedInUser = useAppSelector((state) => state.session.user);
  const history = useHistory();
  const { isAuthenticated } = useAuth0();
  const handleRedirectToSkuPage = () => {
    history.push(`/marketplace/${product?.sku._id}`);
  };

  let redeemable = false;

  if (isAuthenticated) {
    if (
      loggedInUser.id === product?.owner.id &&
      product?.sku.redeemable === true
    ) {
      redeemable = true;
    }
  }

  return (
    <S.Container>
      {product && (
        <ImageGallery
          images={[product?.sku.graphicUrl, ...product?.sku.imageUrls]}
          height="480px"
        />
      )}
      <S.Body>
        <S.Flex justifyContent="space-between" alignItems="center">
          <S.Issuer>{product?.sku.issuerName}</S.Issuer>
          <Rarity type={product?.sku.rarity} />
        </S.Flex>
        <S.SkuName>{product?.sku.name}</S.SkuName>
        <S.Flex>
          {redeemable && (
            <S.Flex alignItems="baseline">
              <S.RedeemIcon />
              <S.SkuInfo>Redeemable</S.SkuInfo>
              <S.SkuInfo color="#7c7c7c">/</S.SkuInfo>
            </S.Flex>
          )}
          {product?.sku.supplyType !== 'variable' && (
            <S.SkuInfo color="#7c7c7c">
              {product?.sku?.circulatingSupply} released
            </S.SkuInfo>
          )}

          <S.SkuInfo onClick={handleRedirectToSkuPage} hover={true}>
            (See All)
          </S.SkuInfo>
        </S.Flex>
        <S.Description>Description</S.Description>
        <S.GreyLine></S.GreyLine>
        <S.DescriptionText>{product?.sku.description}</S.DescriptionText>
      </S.Body>
    </S.Container>
  );
};

export default ProductDetails;
