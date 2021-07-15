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
import { createMessage } from './components/SkuCounter/SkuTextCalculator';
import { useAuth0 } from '@auth0/auth0-react';
import Rarity from 'components/Rarity';
import PageLoader from 'components/PageLoader';
import SkuDescription from './components/SkuDescription';
import LineDivider from './components/LineDivider';
import NotifyModal from 'components/NotifyModal';
import notifyIcon from 'assets/svg/icons/notify-white.svg';
import OwnerAccess from 'views/Product/OwnerAccess';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { getPrivateAssets } from 'services/api/productService';

const SkuDetail = (): JSX.Element => {
  const loggedInUser = useAppSelector((state) => state.session.user);
  const { skuid } = useParams<{ skuid: string }>();
  const [collectors, setCollectors] = useState<{
    data: Collector[];
    total: number;
  } | null>(null);
  const [ownerCollectors, setOwnerCollectors] = useState<{
    data: Collector[];
    total: number;
  } | null>(null);
  const [sku, setSku] = useState<Sku>();
  const [featuredProducts, setFeaturedProducts] = useState<Sku[]>();
  const [filteredFeaturedSku, setFilteredFeaturedSku] = useState<Sku[]>([]);
  const [modalPaymentVisible, setModalPaymentVisible] = useState(false); // TODO: remove if not using
  const modalMode = useRef<'hasFunds' | 'noFunds' | 'completed' | ''>(''); // TODO: remove if not using
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0(); // TODO: remove if not using
  const history = useHistory();
  const [isNotifyModalOpen, setIsNotifyModalOpen] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<
    'description' | 'owner_access'
  >('description');
  const [descriptionVisible, setDescriptionVisible] = useState<boolean>(false);
  const [ownerAccessVisible, setOwnerAccessVisible] = useState<boolean>(false);
  const [privateAssets, setPrivateAssets] = useState<any>([]);
  const theme = useTheme();
  const isSmall: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  const toggleDescription = () => {
    setDescriptionVisible(!descriptionVisible);
  };
  const toggleOwnerAccess = () => {
    setOwnerAccessVisible(!ownerAccessVisible);
  };

  const arePrivateAssets = privateAssets && privateAssets?.data?.length > 0;

  useEffect(() => {
    fetchSku().then((sku) => {
      fetchProducts(sku?.issuer?._id);
    });
    fetchCollectors();
    fetchOwnerCollectors();
  }, [skuid]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading && isAuthenticated) {
        const token = await getAccessTokenSilently();
        getPrivateAssets(skuid, token).then((resp) => setPrivateAssets(resp));
      }
    };
    fetchData();
  }, [skuid, isLoading, isAuthenticated]);

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
    const { data, totalCollectors } = await getProductCollectors(skuid);
    setCollectors({ data: data, total: totalCollectors });
  }

  async function fetchOwnerCollectors() {
    const ownerCollectors = await getProductCollectors(
      skuid,
      1,
      1,
      true,
      undefined,
      undefined,
      true,
      loggedInUser.id
    );
    setOwnerCollectors({
      data: ownerCollectors.data,
      total: ownerCollectors.totalCollectors,
    });
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

  if (!collectors || !featuredProducts || sku == undefined) {
    return <PageLoader />;
  }
  if (!sku) throw new Error('They are no skus available.');

  const handleRedirectToIssuer = () => {
    history.push(`/collection/${sku.issuer.username}`);
  };
  const tylesLimit = 4;
  const skuMessage = createMessage(sku);
  return (
    <div>
      <S.HeaderContainer>
        <S.HeaderContent>
          <S.HeaderLeft>
            <ImageGallery nftPublicAsset={sku?.nftPublicAssets} />
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
                <span style={{ color: '#7C7C7C' }}>{sku.name}</span>
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
                  {sku.issuerName || ''}
                </S.Brand>
                <Rarity type={sku.rarity} fontSize="24" fontWeight="700" />
              </div>

              <S.SkuTitle>{sku.name}</S.SkuTitle>

              <S.Text
                fontSize="18px"
                fontWeight={500}
                color="white"
                padding="16px 0 0 0"
              >
                {sku.series?.name}
              </S.Text>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <S.Text
                  color="#7c7c7c"
                  fontSize="16px"
                  fontWeight={500}
                  padding="10px 0"
                >
                  {skuMessage}
                </S.Text>
              </div>
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
                {sku.issuer?.showNotifyMe && (
                  <>
                    <S.SlashStyle
                      style={{ marginLeft: '2px', marginRight: '2px' }}
                    >
                      {skuMessage !== '' ? ' / ' : null}
                    </S.SlashStyle>
                    <S.NotifyMe
                      to="#"
                      onClick={() => setIsNotifyModalOpen(true)}
                    >
                      <S.NotifyIconImg src={notifyIcon} />
                      <span>Notify Me</span>
                    </S.NotifyMe>
                  </>
                )}
              </div>
              <LineDivider />
              {sku.redeemable && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '-7px',
                  }}
                >
                  <RedeemIcon />
                  &nbsp;{' '}
                  <span style={{ fontSize: '16px', lineHeight: '20px' }}>
                    Redeemable{' '}
                  </span>
                </div>
              )}
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
      <S.Section
        flexDirection="row"
        color="#9E9E9E"
        padding="55px 80px 0 80px"
        height={filteredFeaturedSku.length === 0 ? '100vh' : ''}
      >
        <S.ContainerSection>
          <S.ContainerTabs>
            <S.Tab
              style={{ paddingRight: '20px' }}
              themeStyle={'light'}
              selected={selectedTab === 'description'}
              onClick={() => setSelectedTab('description')}
            >
              <div style={{ display: 'flex' }}>
                Description{' '}
                {isSmall && (
                  <S.ToggleArrow onClick={toggleDescription}>
                    {!descriptionVisible ? (
                      <S.DownArrow style={{ color: 'black' }} />
                    ) : (
                      <S.UpArrow style={{ color: 'black' }} />
                    )}
                  </S.ToggleArrow>
                )}
              </div>
            </S.Tab>
            {/* <S.Padding /> */}

            {arePrivateAssets ? (
              <S.Tab
                style={{
                  width: '50%',
                }}
                themeStyle={'dark'}
                selected={selectedTab === 'owner_access'}
                onClick={() => setSelectedTab('owner_access')}
              >
                <div style={{ display: 'flex' }}>
                  Owner Access{' '}
                  {isSmall && (
                    <S.ToggleArrow onClick={toggleOwnerAccess}>
                      {!ownerAccessVisible ? (
                        <S.DownArrow style={{ color: 'black' }} />
                      ) : (
                        <S.UpArrow style={{ color: 'black' }} />
                      )}
                    </S.ToggleArrow>
                  )}
                </div>
              </S.Tab>
            ) : (
              <></>
            )}
          </S.ContainerTabs>
          <S.ContainerDisplayTabs>
            {selectedTab === 'description' &&
            (descriptionVisible || !isSmall) ? (
              <SkuDescription description={sku?.description || ''} />
            ) : selectedTab === 'owner_access' &&
              (ownerAccessVisible || !isSmall) ? (
              // <OwnerAccessList
              //   assets={sku?.nftPrivateAssets || []}
              //   owner={
              //     (ownerCollectors?.data && ownerCollectors?.data.length > 0) ||
              //     false
              //   }
              //   themeStyle="light"
              //   productId={ownerCollectors?.data[0]._id || ''}
              // />
              <OwnerAccess
                skuId={sku._id}
                owner={
                  (ownerCollectors?.data && ownerCollectors?.data.length > 0) ||
                  false
                }
                themeStyle="light"
                productId={ownerCollectors?.data?.[0]?._id || ''}
              />
            ) : (
              <></>
            )}
          </S.ContainerDisplayTabs>
        </S.ContainerSection>

        {collectors && sku && (
          <AuctionListing
            collectors={collectors.data}
            hasProducts={collectors.data.length !== 0}
            skuId={sku._id}
          />
        )}
      </S.Section>
      {filteredFeaturedSku.length > 0 && (
        <S.Section height="100vh">
          <S.SectionTitle>Related Releases</S.SectionTitle>
          <S.ProductContainer>
            {featuredProducts &&
              filteredFeaturedSku.map((el, index) => {
                // TODO: Stopping after index 5
                if (index >= tylesLimit) return null;
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
        username={sku.issuer?.username}
      />
    </div>
  );
};

export default SkuDetail;
