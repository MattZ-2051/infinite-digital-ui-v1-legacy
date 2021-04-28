import React from 'react';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';
import { ReactComponent as RedeemableIcon } from 'assets/svg/icons/redeemable.svg';
// Local
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { getFeaturedSkuTiles } from 'services/api/sku';
import { getSkuTilesThunk } from 'store/sku/skuThunks';
import { Collector } from 'entities/collector';
// Components
import ImageGallery from 'components/ImageGallery';
import SkuButtonBlock from './components/ActionButtons/SkuButtonBlock';
import ModalPayment from './components/ModalPayment';
import AuctionListing from './components/AuctionListing';
import { Sku } from 'entities/sku';
import { skuWithFunctionsPopulatedFactory } from 'store/sku/skuFactory';
import ProductTile from 'views/MarketPlace/components/ProductTile';
import { getProductCollectors } from 'services/api/productService';

type ReleasedCounterProps = {
  totalSupplyUpcoming: number;
};

const ReleasedCounter = ({ totalSupplyUpcoming }: ReleasedCounterProps) => {
  const text = 'to be released';

  return (
    <>
      {totalSupplyUpcoming} {text}
    </>
  );
};

const SkuDetail = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const skus = useAppSelector((state) => state.sku.skus);

  const { skuid } = useParams<{ skuid: string }>();
  const [skuDetails, setSkuDetails] = useState<Sku>(
    skuWithFunctionsPopulatedFactory.build()
  );
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [modalPaymentVisible, setModalPaymentVisible] = useState(false);
  const modalMode = useRef<'hasFunds' | 'noFunds' | 'completed' | ''>('');

  const [featuredProducts, setFeaturedProducts] = useState<Sku[]>([]);
  async function fetchProducts() {
    const skuTiles = await getFeaturedSkuTiles();
    if (skuTiles) {
      setFeaturedProducts(skuTiles);
    }
  }

  async function fetchCollectors() {
    const collectors = await getProductCollectors(skuid);
    console.log({ collectors });
    setCollectors(collectors);
  }

  useEffect(() => {
    fetchProducts();
    fetchCollectors();
  }, [skuid]);

  useEffect(() => {
    const filteredSkus = skus.filter((sku) => sku._id === skuid);
    if (filteredSkus.length > 0) {
      // TODO: Only pulling the first one
      setSkuDetails(filteredSkus[0]);
    }
  }, [skus]);

  useEffect(() => {
    (async () => {
      dispatch(
        getSkuTilesThunk({
          // TODO: Can pass token here
          token: '',
          // queryParams: `?${urlQueryString.toString()}`,
        })
      );
    })();
    // TODO: This may neeed to be refreshed more often
  }, [dispatch]);

  const showModal = (): void => {
    // TODO: Enable modal based on available funds?
    // if(hasFunds) {
    //   modalMode.current = 'hasFunds';
    //   setModalPaymentVisible(true);
    // } else {
    //   modalMode.current = 'noFunds';
    //   setModalPaymentVisible(true);
    // }
    setModalPaymentVisible(true);
  };

  // TODO: Note in use
  const Buy = () => {
    const completed = true;

    if (completed) {
      modalMode.current = 'completed';
      setModalPaymentVisible(true);
    }
  };

  return (
    <div>
      <ModalPayment
        visible={modalPaymentVisible}
        setModalPaymentVisible={setModalPaymentVisible}
        mode={modalMode.current}
      />

      <HeaderContainer>
        <HeaderContent>
          <HeaderLeft>
            {skuDetails && (
              <ImageGallery
                images={[skuDetails.graphicUrl, ...skuDetails.imageUrls]}
              />
            )}
          </HeaderLeft>
          <HeaderRight>
            <ProductDetail>
              <Breadcrumbs>
                <a href="/marketplace" style={{ color: 'white' }}>
                  Marketplace
                </a>{' '}
                / <span style={{ color: '#7C7C7C' }}>{skuDetails?.name}</span>
              </Breadcrumbs>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  fontSize: '24px',
                }}
              >
                {/* TODO: Using issuer.username here for brand */}
                <Brand>{skuDetails?.issuer?.username || ''}</Brand>
                <Rarity>
                  <span></span>
                  {skuDetails?.rarity}
                </Rarity>
              </div>

              <SkuTitle>{skuDetails?.name}</SkuTitle>

              <p
                style={{
                  fontSize: '18px',
                }}
              >
                # {skuDetails?.series?.name}
              </p>

              <p>
                <ReleasedCounter
                  totalSupplyUpcoming={skuDetails.totalSupplyUpcoming}
                />
              </p>

              <LineDivider />

              {skuDetails?.redeemable && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <RedeemableIcon /> &nbsp; Redeemable
                </div>
              )}
            </ProductDetail>

            <ButtonsContainer>
              <SkuButtonBlock sku={skuDetails} onBuyNow={showModal} />
            </ButtonsContainer>
          </HeaderRight>
        </HeaderContent>
      </HeaderContainer>

      <Section
        style={{ paddingTop: '55px', flexDirection: 'row', color: '#9E9E9E' }}
      >
        <Description>
          <SectionTitle>Description</SectionTitle>
          {skuDetails?.description}
        </Description>

        {collectors && (
          <AuctionListing collectors={collectors} hasProducts={true} />
        )}
      </Section>

      <Section>
        <SectionTitle>Related Releases</SectionTitle>

        <ProductContainer>
          {featuredProducts &&
            featuredProducts.map((el, index) => {
              if (index >= 5) return null;
              return (
                <TileContainer key={index} index={index}>
                  <ProductTile
                    sku={el}
                    redeemable={true}
                    status="tbd"
                    productSerialNumber="1"
                    key={index}
                    // TODO: Find out why this is not a Date
                    purchasedDate="1k"
                  />
                </TileContainer>
              );
            })}
        </ProductContainer>
      </Section>
    </div>
  );
};

const HeaderContainer = styled.div`
  background-color: #1a1a1a;
`;

const HeaderContent = styled.div`
  max-width: 1440px;
  margin: auto;
  display: flex;
  flex-direction: row;
  height: 700px;
  color: white;
  justify-content: space-between;
  // border: 1px solid #676767;
`;

const HeaderLeft = styled.div`
  width: 54%;
  padding: 0 0 0 80px;
`;

const HeaderRight = styled.div`
  width: 46%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  padding: 48px 80px 20px 48px;
`;

const Description = styled.div`
  width: 54%;
`;

const Listing = styled.div`
  width: 46%;
  max-width: 713px;
  margin-left: 64px;
`;

const SkuTitle = styled.div`
  font-size: 48px;
`;

const Brand = styled.h3`
  font-size: 24px;
  color: #8e8e8e;
  margin-bottom: 16px;
`;

const ButtonsContainer = styled.div`
  // border: 2px solid red;
`;

const Tile = styled.div`
  width: 305px;
  height: 515px;
  background-color: #ddd8db;
  border-radius: 20px;
  margin-right: 15px;
`;

const TileContainer = styled.div<{ index: number }>`
  padding: 0 20px;
  float: left;
  padding-left: ${({ index }) => `${index === 0 ? '0px' : '10px'}`};
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  padding: 0 80px 48px 80px;
  //border: 1px solid green;
  margin: auto;
  font-size: 16px;
`;

const SectionTitle = styled.h2`
  font-weight: 600 !important;
  font-size: 24px;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 40px;
  font-weight: 500px;
  color: black;
`;

const SectionSubTitle = styled.h3`
  font-weight: 600 !important;
  font-size: 18px;
  color: black;
`;

const TilesContainer = styled.div`
  display: flex;
`;

const Breadcrumbs = styled.div`
  margin-bottom: 40px;
  a {
    text-decoration: none;
    color: grey;
  }
`;

const Rarity = styled.div`
  display: flex;
  align-items: center;
  color: #2ddebf;

  span {
    border-radius: 50%;
    background-color: #2ddebf;
    height: 20px;
    width: 20px;
    display: inline-block;
    margin-right: 8px;
  }
`;

const LineDivider = styled.div`
  height: 1px;
  background-color: #464646;
  width: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ProductContainer = styled.div`
  && {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    height: 36em;

    @media screen and (max-width: 600px) {
      margin: auto;
      width: 320px;
    }

    ::-webkit-scrollbar {
      height: 0.4em;
    }
    ::-webkit-scrollbar-button {
      width: 0.1em;
    }
    ::-webkit-scrollbar-track-piece {
    }
    ::-webkit-scrollbar-thumb {
      background: var(--grey-40);
      width: 1px !important;
      border-radius: 10px;
    }
  }
`;

export default SkuDetail;
