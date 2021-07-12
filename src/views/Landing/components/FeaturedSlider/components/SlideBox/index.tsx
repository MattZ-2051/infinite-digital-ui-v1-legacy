import { Sku } from 'entities/sku';
import { formatSkuCountdown } from 'utils/dates';
import { Link } from 'react-router-dom';
import TilePill from 'components/ProductTiles/Tile/components/TilePill';
import Rarity from 'components/Rarity';
import ImageGallery from 'components/ImageGallery';
import * as S from './styles';

export interface IProps {
  product: Sku;
}

type SkuStatus =
  | 'upcoming-sku'
  | 'upcoming-sku-time'
  | 'active'
  | 'no-sale'
  | '';

const SlideBox = ({ product }: IProps): JSX.Element => {
  const {
    minPrice,
    totalSupplyLeft,
    minStartDate,
    productListings,
    skuListings,
    upcomingSkuListings,
    upcomingProductListings,
    activeProductListings,
    activeSkuListings,
  } = product;

  let pillInfo: string | number = '';
  let skuUpcomingTime = '';
  let status: SkuStatus = '';
  const skuStartDateTime = new Date(minStartDate).getTime();
  const currentTime = new Date().getTime();
  const productListingsExist = productListings?.length !== 0;
  const skuListingsExist = skuListings.length !== 0;
  const totalSupplyLeftIsNotZero = totalSupplyLeft !== 0;
  const activeProductListingsExist = activeProductListings?.length !== 0;
  const activeSkuListingsExist = activeSkuListings?.length !== 0;
  const skuListingIsExpired = skuListings[0].status === 'expired';

  (() => {
    if (
      !productListingsExist &&
      !skuListingsExist &&
      totalSupplyLeftIsNotZero
    ) {
      status = 'upcoming-sku';
      return;
    }
    if (
      (skuStartDateTime > currentTime && upcomingSkuListings?.length !== 0) ||
      upcomingProductListings?.length !== 0
    ) {
      status = 'upcoming-sku-time';
      skuUpcomingTime = formatSkuCountdown(new Date(minStartDate));
      pillInfo = skuUpcomingTime;
      return;
    } else if (
      totalSupplyLeftIsNotZero ||
      activeProductListingsExist ||
      activeSkuListingsExist
    ) {
      status = 'active';
      pillInfo = minPrice;
      return;
    } else if (!totalSupplyLeftIsNotZero || skuListingIsExpired) {
      status = 'no-sale';
      return;
    }
  })();

  return (
    <S.Container>
      <Link to={`/marketplace/${product._id}`}>
        <S.MediaContainer>
          <ImageGallery nftPublicAsset={product?.nftPublicAssets} />
        </S.MediaContainer>
      </Link>

      <S.ProductDetails>
        <S.Issuer>
          <span style={{ paddingRight: '60px' }}>{product.issuerName}</span>
          <Rarity type={product.rarity} />
        </S.Issuer>
        <S.ProductName>{product.name}</S.ProductName>
        <S.Series>{product.series?.name}</S.Series>
        <S.CreatedBy>
          <span>Created by</span>
          <S.IssuerName>{product?.issuer?.username}</S.IssuerName>
          <S.ViewMore to={`/collection/${product?.issuer?.username}`}>
            (View more)
          </S.ViewMore>
        </S.CreatedBy>
        <S.ViewDetails to={`/marketplace/${product._id}`}>
          <TilePill pillInfo={pillInfo} status={status} light />
        </S.ViewDetails>
      </S.ProductDetails>
    </S.Container>
  );
};

export default SlideBox;
