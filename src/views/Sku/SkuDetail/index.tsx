import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as RedeemIcon } from 'assets/svg/icons/redeemable-white-background.svg';
// Local
import { useAppSelector } from 'store/hooks';
import { getFeaturedSkuTiles, getSku } from 'services/api/sku';
import { Collector } from 'entities/collector';
import * as S from './styles';
// Components
import ImageGallery from 'components/ImageGallery';
import SkuButtonBlock from './components/ActionButtons/SkuButtonBlock';
import AuctionListing from './components/AuctionListing';
import { Sku } from 'entities/sku';
import SkuTile from 'views/MarketPlace/components/SkuTile';
import { getProductCollectors } from 'services/api/productService';
import { SkuCounter } from './components/SkuCounter/skuCounter';
import { useAuth0 } from '@auth0/auth0-react';

const SkuDetail = (): JSX.Element => {
  const loggedInUser = useAppSelector((state) => state.session.user);
  const { skuid } = useParams<{ skuid: string }>();
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [sku, setSku] = useState<Sku>();
  const [featuredProducts, setFeaturedProducts] = useState<Sku[]>();
  const [modalPaymentVisible, setModalPaymentVisible] = useState(false); // TODO: remove if not using
  const modalMode = useRef<'hasFunds' | 'noFunds' | 'completed' | ''>(''); // TODO: remove if not using
  const { getAccessTokenSilently } = useAuth0(); // TODO: remove if not using

  useEffect(() => {
    fetchSku();
    fetchProducts();
    fetchCollectors();
  }, [skuid]);

  async function fetchProducts() {
    const skuTiles = await getFeaturedSkuTiles();
    setFeaturedProducts(skuTiles.data);
  }

  async function fetchCollectors() {
    const collectors = await getProductCollectors(skuid);
    setCollectors(collectors);
  }

  async function fetchSku() {
    const sku = await getSku<true>(skuid, {
      includeFunctions: true,
    });
    setSku(sku);
  }

  const showModal = (): void => {
    setModalPaymentVisible(true);
  };

  return (
    <div>
      {sku && (
        <S.HeaderContainer>
          <S.HeaderContent>
            <S.HeaderLeft>
              <ImageGallery images={[sku.graphicUrl, ...sku.imageUrls]} />
            </S.HeaderLeft>
            <S.HeaderRight>
              <S.ProductDetail>
                <S.Breadcrumbs>
                  <a href="/marketplace" style={{ color: 'white' }}>
                    Marketplace
                  </a>{' '}
                  / <span style={{ color: '#7C7C7C' }}>{sku && sku.name}</span>
                </S.Breadcrumbs>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    fontSize: '24px',
                  }}
                >
                  <S.Brand>{sku?.issuerName || ''}</S.Brand>
                  <S.Rarity>
                    <span></span>
                    {sku?.rarity}
                  </S.Rarity>
                </div>

                <S.SkuTitle>{sku?.name}</S.SkuTitle>

                <p
                  style={{
                    fontSize: '18px',
                  }}
                >
                  # {sku?.series?.name}
                </p>

                <p>
                  <SkuCounter sku={sku} />
                </p>

                <S.LineDivider />

                {sku?.redeemable && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <RedeemIcon />
                    &nbsp; Redeemable
                  </div>
                )}
              </S.ProductDetail>

              <S.ButtonsContainer>
                <SkuButtonBlock
                  collectors={collectors}
                  sku={sku}
                  user={loggedInUser}
                  onBuyNow={showModal}
                />
              </S.ButtonsContainer>
            </S.HeaderRight>
          </S.HeaderContent>
        </S.HeaderContainer>
      )}

      <S.Section flexDirection="row" color="#9E9E9E" padding="55px 80px 0 80px">
        <S.Description>
          <S.SectionTitle>Description</S.SectionTitle>
          {/* {skuDetails?.description} */}
        </S.Description>

        {collectors && (
          <AuctionListing collectors={collectors} hasProducts={true} />
        )}
      </S.Section>

      <S.Section>
        <S.SectionTitle>Related Releases</S.SectionTitle>

        <S.ProductContainer>
          {featuredProducts &&
            featuredProducts.map((el, index) => {
              if (index >= 5) return null;
              return (
                <S.TileContainer key={index} index={index}>
                  {/*TODO from Matt: find out what kind of tile is going to be rendererd here and handle redirect when clicked*/}
                  <SkuTile sku={el} key={index} theme="light" />
                </S.TileContainer>
              );
            })}
        </S.ProductContainer>
      </S.Section>
    </div>
  );
};

{
  /* <S.Section
        style={{ paddingTop: '55px', flexDirection: 'row', color: '#9E9E9E' }}
      ></S.Section> */
}

export default SkuDetail;
