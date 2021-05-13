import { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
import Rarity from 'components/Rarity';
import PageLoader from 'components/PageLoader';
import SkuDescription from './components/SkuDescription';
import LineDivider from './components/LineDivider';

const SkuDetail = (): JSX.Element => {
  const loggedInUser = useAppSelector((state) => state.session.user);
  const { skuid } = useParams<{ skuid: string }>();
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [sku, setSku] = useState<Sku>();
  const [featuredProducts, setFeaturedProducts] = useState<Sku[]>();
  const [modalPaymentVisible, setModalPaymentVisible] = useState(false); // TODO: remove if not using
  const modalMode = useRef<'hasFunds' | 'noFunds' | 'completed' | ''>(''); // TODO: remove if not using
  const { getAccessTokenSilently } = useAuth0(); // TODO: remove if not using
  const history = useHistory();

  useEffect(() => {
    fetchSku().then((sku) => {
      fetchProducts(sku?.issuer?._id);
    });
    fetchCollectors();
  }, [skuid]);

  async function fetchProducts(issuerId: string) {
    const skuTiles = await getFeaturedSkuTiles({ issuerId: issuerId });
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
    return sku;
  }

  const showModal = (): void => {
    setModalPaymentVisible(true);
  };

  if (!collectors || !sku || !featuredProducts) return <PageLoader />;

  const handleRedirectToIssuer = () => {
    history.push(`/collection/${sku?.issuer._id}`);
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
                  <S.Brand onClick={handleRedirectToIssuer}>
                    {sku?.issuerName || ''}
                  </S.Brand>
                  <Rarity type={sku?.rarity} />
                </div>

                <S.SkuTitle>{sku?.name}</S.SkuTitle>

                <p
                  style={{
                    fontSize: '18px',
                  }}
                >
                  {sku?.series?.name}
                </p>

                <p>
                  <SkuCounter sku={sku} />
                </p>

                <LineDivider />

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
        <SkuDescription description={sku?.description} />

        {collectors && (
          <AuctionListing
            collectors={collectors}
            hasProducts={collectors.length !== 0}
          />
        )}
      </S.Section>

      <S.Section>
        <S.SectionTitle>Related Releases</S.SectionTitle>
        <S.ProductContainer>
          {featuredProducts &&
            featuredProducts.map((el, index) => {
              // TODO: Stopping after index 5
              if (index >= 5) return null;
              return (
                <S.TileContainer key={index} index={index}>
                  {/*TODO from Matt: find out what kind of tile is going to be rendererd here and handle redirect when clicked*/}
                  <SkuTile sku={el} key={index} themeStyle="light" />
                </S.TileContainer>
              );
            })}
        </S.ProductContainer>
      </S.Section>
    </div>
  );
};

export default SkuDetail;
