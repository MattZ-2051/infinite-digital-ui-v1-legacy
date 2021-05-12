import { ProductWithFunctions } from 'entities/product';
import ImageGallery from 'components/ImageGallery';
import Rarity from 'components/Rarity';
import { useAppSelector } from 'store/hooks';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import * as S from './styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

interface Props {
  product: ProductWithFunctions | null;
}

const createMarkup = (markup) => ({
  __html: markup,
});

const ProductDetails = ({ product }: Props) => {
  //TODO: add backend changes for sku series name and series name for series
  const loggedInUser = useAppSelector((state) => state.session.user);
  const history = useHistory();
  const { isAuthenticated } = useAuth0();
  const [descriptionVisible, setDescriptionVisible] = useState<boolean>(false);
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
  const theme = useTheme();
  const isSmall: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  const toggleDescription = () => {
    setDescriptionVisible(!descriptionVisible);
  };

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
              {product?.sku?.maxSupply === 1
                ? '1 of 1'
                : `${product?.totalSupply} released`}
            </S.SkuInfo>
          )}

          {product?.sku?.maxSupply !== 1 && (
            <S.SkuInfo onClick={handleRedirectToSkuPage} hover={true}>
              {product?.sku?.supplyType === 'variable' &&
                product?.sku?.circulatingSupply > 0 &&
                `${product?.sku?.circulatingSupply || 0} Released `}
              {product?.sku?.supplyType === 'fixed' &&
                product?.sku?.totalSupply > 0 &&
                `${product?.sku?.totalSupply || 0} Released `}
              (See All)
            </S.SkuInfo>
          )}
        </S.Flex>
        <S.Description>
          Description
          {isSmall && (
            <S.ShowDescription onClick={toggleDescription}>
              {!descriptionVisible ? (
                <S.DownArrow style={{ color: 'black' }} />
              ) : (
                <S.UpArrow style={{ color: 'black' }} />
              )}
            </S.ShowDescription>
          )}
        </S.Description>
        <S.GreyLine />
        {(descriptionVisible || !isSmall) && (
          <S.DescriptionText
            dangerouslySetInnerHTML={createMarkup(product?.sku?.description)}
          ></S.DescriptionText>
        )}
      </S.Body>
    </S.Container>
  );
};

export default ProductDetails;
