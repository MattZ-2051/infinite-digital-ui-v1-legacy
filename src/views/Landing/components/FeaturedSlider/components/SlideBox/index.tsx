import styled from 'styled-components/macro';
import { Sku } from 'entities/sku';
import { formatSkuCountdown } from 'utils/dates';
import { Link } from 'react-router-dom';
import TilePill from 'components/ProductTiles/Tile/components/TilePill';
import Rarity from 'components/Rarity';

export interface IProps {
  product: Sku;
}

const SlideBox = ({ product }: IProps): JSX.Element => {
  const {
    minPrice,
    totalSupplyLeft,
    totalSupplyUpcoming,
    minStartDate,
    productListings,
    skuListings,
  } = product;

  let pillInfo: string | number = '';
  let skuUpcomingTime = '';

  (() => {
    if (productListings?.length === 0 && skuListings.length === 0) {
      status = 'upcoming-sku';
      return;
    }
    if (totalSupplyLeft === 0 && totalSupplyUpcoming === 0) {
      status = 'upcoming-sku-time';
      skuUpcomingTime = formatSkuCountdown(new Date(minStartDate));
      pillInfo = skuUpcomingTime;
      return;
    } else if (totalSupplyLeft > 0) {
      status = 'active';
      pillInfo = minPrice;
      return;
    } else if (totalSupplyLeft === 0) {
      status = 'no-sale';
      return;
    }
  })();

  return (
    <Container>
      <MediaContainer>
        {product.graphicUrl?.endsWith('mov') ||
        product.graphicUrl?.endsWith('mp4') ? (
          <video
            style={{
              width: '100%',
            }}
            playsInline
            autoPlay={true}
            controls={false}
            loop={true}
            muted={true}
            src={product.graphicUrl}
          ></video>
        ) : (
          <img src={product.graphicUrl} alt="" />
        )}
      </MediaContainer>

      <ProductDetails>
        <Issuer>
          <span style={{ paddingRight: '60px' }}>{product.issuerName}</span>
          <Rarity type={product.rarity} />
        </Issuer>
        <ProductName>{product.name}</ProductName>
        <Series>{product.series?.name}</Series>
        {/* {product.supplyType === 'fixed' && (
          <TotalSupply>
            {product.totalSupply} of {product.totalSupply}
          </TotalSupply>
        )} */}
        <CreatedBy>
          <span>Created by</span>
          <IssuerName>{product.issuer.username}</IssuerName>
          <ViewMore to={`/collection/${product.issuer._id}`}>
            (View more)
          </ViewMore>
        </CreatedBy>
        <ViewDetails to={`/marketplace/${product._id}`}>
          <TilePill pillInfo={pillInfo} status={status} light />
        </ViewDetails>
      </ProductDetails>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  max-width: 1440px;
  padding: 0 50px 0 50px;
  display: flex;
  align-items: center;
  margin: auto;

  @media screen and (max-width: 960px) {
    flex-direction: column;
    height: auto;
    padding: 24px 24px 24px 24px;
    justify-content: center;
  }
`;

const MediaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 630px;
  background-repeat: no-repeat;
  background-position: center;
  width: 80%;
  background-size: contain;

  img {
    width: 100%;
  }

  @media screen and (max-width: 960px) {
    height: 80vw;
  }
`;

const ProductDetails = styled.div`
  display: inline-grid;
  grid-gap: 32px;
  height: auto;
  font-weight: 600;
  width: 50%;
  padding-left: 10%;

  @media screen and (max-width: 960px) {
    min-width: 100%;
    font-size: 0.85rem;
    grid-gap: 10px;
    min-height: 320px;
  }

  p {
    margin: 0;
  }
`;

const Issuer = styled.div`
  font-size: 22px;
  color: #8e8e8e;
  display: flex;
  align-items: baseline;
`;

const ProductName = styled.h3`
  font-size: 42px;

  @media screen and (max-width: 960px) {
    font-size: 32px;
  }
`;

const Series = styled.small`
  font-size: 1rem;
`;

const TotalSupply = styled.div``;

const Epic = styled.span`
  background: linear-gradient(41.72deg, #00eb7c -14.01%, #11d6ec 90.62%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 32px;
`;

const ViewDetails = styled(Link)`
  text-decoration: none;
  margin-top: 40px;
`;

const ViewMore = styled(Link)`
  color: white;
  font-weight: 400;
`;

const CreatedBy = styled.div`
  font-weight: 400;
`;

const IssuerName = styled.span`
  font-weight: 600;
  margin: 0 10px 0 10px;
`;

export default SlideBox;
