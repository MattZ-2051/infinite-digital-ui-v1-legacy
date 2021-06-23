import { Sku } from 'entities/sku';
import { formatSkuCountdown } from 'utils/dates';
import { Link } from 'react-router-dom';
import TilePill from 'components/ProductTiles/Tile/components/TilePill';
import Rarity from 'components/Rarity';
import * as S from './styles';

export interface IProps {
  product: Sku;
}

const SlideBox = ({ product }: IProps): JSX.Element => {
  const {
    minPrice,
    totalSupplyLeft,
    totalUpcomingSupply,
    minStartDate,
    productListings,
    skuListings,
    upcomingSkuListings,
  } = product;

  let pillInfo: string | number = '';
  let skuUpcomingTime = '';
  const skuStartDateTime = new Date(minStartDate).getTime();
  const currentTime = new Date().getTime();

  (() => {
    if (productListings?.length === 0 && skuListings.length === 0) {
      status = 'upcoming-sku';
      return;
    }
    if (skuStartDateTime > currentTime && upcomingSkuListings?.length !== 0) {
      status = 'upcoming-sku-time';
      skuUpcomingTime = formatSkuCountdown(new Date(minStartDate));
      pillInfo = skuUpcomingTime;
      return;
    } else if (totalSupplyLeft > 0) {
      status = 'active';
      pillInfo = minPrice;
      return;
    } else if (totalSupplyLeft === 0 || skuListings[0].status === 'expired') {
      status = 'no-sale';
      return;
    }
  })();

  return (
    <S.Container>
      <Link to={`/marketplace/${product._id}`}>
        <S.MediaContainer>
          {product.graphicUrl?.endsWith('mov') ||
          product.graphicUrl?.endsWith('mp4') ? (
            <S.Video
              playsInline
              autoPlay={true}
              controls={false}
              loop={true}
              muted={true}
              src={product.graphicUrl}
            />
          ) : (
            <img src={product.graphicUrl} alt="" />
          )}
        </S.MediaContainer>
      </Link>

      <S.ProductDetails>
        <S.Issuer>
          <span style={{ paddingRight: '60px' }}>{product.issuerName}</span>
          <Rarity type={product.rarity} />
        </S.Issuer>
        <S.ProductName>{product.name}</S.ProductName>
        <S.Series>{product.series?.name}</S.Series>
        {/* {product.supplyType === 'fixed' && (
          <TotalSupply>
            {product.totalSupply} of {product.totalSupply}
          </TotalSupply>
        )} */}
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
