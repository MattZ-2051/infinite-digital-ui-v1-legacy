import React, { useState, useEffect, useRef } from 'react';
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
import NotifyModal from 'components/NotifyModal';
import notifyIcon from 'assets/svg/icons/notify-white.svg';

const SkuDetail = (): JSX.Element => {
  const loggedInUser = useAppSelector((state) => state.session.user);
  const { skuid } = useParams<{ skuid: string }>();
  const [collectors, setCollectors] = useState<{
    data: Collector[];
    total: number;
  } | null>(null);
  const [sku, setSku] = useState<Sku>();
  const [featuredProducts, setFeaturedProducts] = useState<Sku[]>();
  const [filteredFeaturedSku, setFilteredFeaturedSku] = useState<Sku[]>([]);
  const [modalPaymentVisible, setModalPaymentVisible] = useState(false); // TODO: remove if not using
  const modalMode = useRef<'hasFunds' | 'noFunds' | 'completed' | ''>(''); // TODO: remove if not using
  const { getAccessTokenSilently } = useAuth0(); // TODO: remove if not using
  const history = useHistory();
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchSku().then((sku) => {
      fetchProducts(sku?.issuer?._id);
    });
    fetchCollectors();
  }, [skuid]);

  useEffect(() => {
    const filtered = featuredProducts?.filter(
      (featuredSku) => featuredSku?._id !== sku?._id
    );
    setFilteredFeaturedSku(filtered || []);
  }, [featuredProducts, sku]);

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

  const onProcessing = () => {
    return fetchSku();
  };

  const showModal = (): void => {
    setModalPaymentVisible(true);
  };

  if (!collectors || !featuredProducts) return <PageLoader />;

  const handleRedirectToIssuer = () => {
    history.push(`/collection/${sku?.issuer.username}`);
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
                  <a
                    href="/marketplace?page=1&per_page=6&sortBy=startDate:asc"
                    style={{ color: 'white' }}
                  >
                    Marketplace
                  </a>
                  <span style={{ color: '#7C7C7C' }}>{sku && sku.name}</span>
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
                  <Rarity type={sku?.rarity} fontSize="24" fontWeight="400" />
                </div>

                <S.SkuTitle>{sku?.name}</S.SkuTitle>

                <p
                  style={{
                    fontSize: '18px',
                  }}
                >
                  {sku?.series?.name}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {sku?.redeemable && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <RedeemIcon />
                      &nbsp; Redeemable{' '}
                      <span
                        style={{
                          color: '#7c7c7c',
                          fontWeight: 600,
                          padding: '0 5px',
                        }}
                      >
                        /
                      </span>
                    </div>
                  )}
                  <span>
                    <SkuCounter sku={sku} />
                  </span>
                </div>

                <LineDivider />

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    flexWrap: 'wrap',
                  }}
                >
                  <S.CreatedBy>Created by</S.CreatedBy>
                  <S.CreatorName to={`/collection/${sku.issuer.username}`}>
                    @{sku.issuer.username}
                  </S.CreatorName>
                  {sku?.issuer?.showNotifyMe && (
                    <S.NotifyMe
                      to="#"
                      onClick={() => setIsNotifyModalOpen(true)}
                    >
                      <S.NotifyIconImg src={notifyIcon} />
                      <span>Notify Me</span>
                    </S.NotifyMe>
                  )}
                </div>
              </S.ProductDetail>

              <S.ButtonsContainer>
                <SkuButtonBlock
                  collectors={collectors.data}
                  sku={sku}
                  user={loggedInUser}
                  onBuyNow={showModal}
                  onProcessing={onProcessing}
                />
              </S.ButtonsContainer>
            </S.HeaderRight>
          </S.HeaderContent>
        </S.HeaderContainer>
      )}

      <S.Section flexDirection="row" color="#9E9E9E" padding="55px 80px 0 80px">
        <SkuDescription description={sku?.description || ''} />

        {collectors && sku && (
          <AuctionListing
            collectors={collectors.data}
            hasProducts={collectors.data.length !== 0}
            skuId={sku._id}
          />
        )}
      </S.Section>
      {filteredFeaturedSku.length > 0 && (
        <S.Section>
          <S.SectionTitle>Related Releases</S.SectionTitle>
          <S.ProductContainer>
            {featuredProducts &&
              filteredFeaturedSku.map((el, index) => {
                // TODO: Stopping after index 5
                if (index >= 4) return null;
                return (
                  <S.TileContainer key={index} index={index}>
                    <SkuTile sku={el} key={index} themeStyle="light" />
                  </S.TileContainer>
                );
              })}
          </S.ProductContainer>
        </S.Section>
      )}
      <NotifyModal
        isModalOpen={isNotifyModalOpen}
        handleClose={() => setIsNotifyModalOpen(false)}
        username={sku?.issuer?.username}
      />
    </div>
  );
};

export default SkuDetail;
