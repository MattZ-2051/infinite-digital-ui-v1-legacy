import { useState } from 'react';
import styled from 'styled-components/macro';
import { formatDate } from 'utils/dates';
import Toast from 'utils/Toast';
import { Sku } from 'entities/sku';
import { User } from 'entities/user';
import { Collector } from 'entities/collector';
import { Listing } from 'entities/listing';
import { useAuth0 } from '@auth0/auth0-react';
import { useCountdown } from 'hooks/useCountdown';
import SkuPageModal from '../../ModalPayment/SkuPageModal/index';
import { useAppSelector } from 'store/hooks';

const NotAvailable = (): JSX.Element => {
  return (
    <Container>
      <h4>Not available</h4>
    </Container>
  );
};
const ComingSoon = (): JSX.Element => {
  return (
    <Container>
      <h4>Coming soon...</h4>
    </Container>
  );
};
interface IUpcomingData {
  startDate?: Date;
  price: number;
  items: number;
  supplyType: string;
}

const UpcomingData = ({
  startDate = new Date(),
  price,
  items,
  supplyType,
}: IUpcomingData) => {
  const parsedStartDate = new Date(startDate);
  const countdown = useCountdown(parsedStartDate);

  console.log('supply type', supplyType);
  return (
    <>
      {' '}
      <Container>
        <BoxColumn>
          <h4 style={{ fontSize: '24px', color: '#8E8E8E' }}>Upcoming</h4>
          <small style={{ fontSize: '15px', color: '#8E8E8E' }}>{''}</small>
        </BoxColumn>
        <BoxColumn style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '28px' }}>${price}</span>
          {supplyType === 'variable' && (
            <small style={{ fontSize: '15px' }}>
              {items && `(${items} items)`}
            </small>
          )}
        </BoxColumn>
        <BoxColumn style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '28px' }}>{countdown}</span>
          <small style={{ fontSize: '14px', color: '#8E8E8E' }}>
            {formatDate(startDate)}
          </small>
        </BoxColumn>
      </Container>
    </>
  );
};

interface IFromCreatorBox {
  sku: Sku;
  listing?: Listing;
  onBuyNow: () => void;
  price?: number;
  user: User;
  buttonDisabled: boolean;
  buttonLabel: string;
}

const FromCreatorBox = ({
  sku,
  listing,
  onBuyNow,
  price,
  user,
  buttonDisabled,
  buttonLabel,
}: IFromCreatorBox): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const userBalance = useAppSelector(
    (state) => state.session.userCards?.balance?.amount
  );
  const hasFunds = price ? userBalance >= price : false;
  const modalMode = hasFunds ? 'hasFunds' : 'noFunds';

  const handleBuyNowClick = () => {
    // TODO: Check this call with pablo
    onBuyNow();
    if (isAuthenticated) {
      setIsModalOpen(true);
    } else {
      Toast.error(
        <>
          You need to{' '}
          <a onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>
            Log in
          </a>{' '}
          in order to complete the purchase
        </>
      );
    }
  };

  return (
    <Container>
      <Detail>
        <BoxColumn>
          <h4 style={{ fontSize: '24px', color: '#8E8E8E' }}>From Creator</h4>
          <small style={{ fontSize: '15px', color: '#8E8E8E' }}>
            Initial Release
          </small>
        </BoxColumn>
        <BoxColumn style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '28px' }}>{price && `$${price}`}</span>
          {sku.supplyType === 'fixed' && (
            <small style={{ fontSize: '15px' }}>
              {sku?.totalSkuListingSupplyLeft >= 0 &&
                `(${sku?.totalSkuListingSupplyLeft} left)`}
            </small>
          )}
        </BoxColumn>
      </Detail>
      <Button disabled={buttonDisabled} onClick={() => handleBuyNowClick()}>
        {buttonLabel}
      </Button>
      <SkuPageModal
        visible={isModalOpen}
        setModalPaymentVisible={setIsModalOpen}
        mode={modalMode}
        sku={sku}
        user={user}
        listing={listing}
      />
    </Container>
  );
};

interface IFromCollectorsBox {
  minimunPrice: number;
  countProductListings: number;
  totalSupply?: number;
}

const FromCollectorsBox = ({
  minimunPrice,
  countProductListings,
}: IFromCollectorsBox): JSX.Element => {
  return (
    <Container>
      <BoxColumn>
        <h4 style={{ fontSize: '24px', color: '#8E8E8E' }}>From Collectors</h4>
        <small style={{ fontSize: '15px', color: '#8E8E8E' }}>
          Lowest Listing Price
        </small>
      </BoxColumn>
      <BoxColumn>
        <span style={{ fontSize: '28px' }}>
          {!!countProductListings ? minimunPrice : '--'}
        </span>
        <small style={{ fontSize: '15px' }}>
          {!!countProductListings
            ? `(${countProductListings} for sale)`
            : `${countProductListings} minted`}
        </small>
      </BoxColumn>
      <div>
        <Button>See All</Button>
      </div>
    </Container>
  );
};

interface ISkuButtonBlock {
  sku: Sku;
  user: User;
  onBuyNow: () => void;
  collectors: Collector[];
}

const SkuButtonBlock = ({
  sku,
  user,
  onBuyNow,
  collectors,
}: ISkuButtonBlock): JSX.Element => {
  const numSkuListings = sku.skuListings.length;
  const activeListings = sku.skuListings.filter(
    (skuListing) => skuListing.status === 'active' && !skuListing.canceled
  );
  const upcomingSkuListings = sku.skuListings.filter(
    (skuListing) => skuListing.status === 'upcoming' && !skuListing.canceled
  );
  const canceledSkuListings = sku.skuListings.filter(
    (skuListing) => skuListing.canceled
  );

  if (!numSkuListings) {
    return <></>; // Returning empty for now
    // need to remove this return after MVP
    // This scenario is for the direct product listing (post-MVP)

    // this is STATE 0 = 1 product listing only = no sku listings
    const upcomingProductListings = collectors.filter(
      (collector) => collector.upcomingProductListing
    );
    if (upcomingProductListings.length > 0) {
      const upcomingProductListing =
        upcomingProductListings[0].upcomingProductListing;
      if (upcomingProductListing?.saleType === 'fixed') {
        // Price attribute: upcomingProductListing.price
        return <> return countdown timer for upcoming </>;
      } else if (upcomingProductListing?.saleType === 'auction') {
        // Price attribute: upcomingProductListing.minBid
        return <> auction scenario - return countdown timer</>;
      }
    }
    const activeProductListings = collectors.filter(
      (collector) => collector.activeProductListing
    );
    if (activeProductListings.length > 0) {
      const activeProductListing =
        activeProductListings[0].activeProductListing;
      return <> {activeProductListing?.price} </>;
    }
    if (
      upcomingProductListings.length === 0 &&
      activeProductListings.length === 0
    ) {
      // This is a product listing
      return (
        <>
          <FromCreatorBox
            sku={sku}
            listing={undefined}
            user={user}
            onBuyNow={onBuyNow}
            buttonDisabled={true}
            buttonLabel="Not for sale"
          />
        </>
      );
    }
  }

  /**
   * Upcoming sku listings
   */
  if (upcomingSkuListings.length > 0 && !activeListings.length) {
    const upcomingSkuListing = upcomingSkuListings[0];
    const startDate = upcomingSkuListing.startDate;
    const price = upcomingSkuListing.price;
    // TODO: Changed this from supplyLeft (not in api response) to supply
    const numItems = upcomingSkuListing.supply;

    return (
      <UpcomingData
        startDate={startDate}
        price={price}
        items={numItems}
        supplyType={sku.supplyType}
      />
    );

    // TODO: Will implement when auctions are available
    // const saleType = upcomingSkuListing.saleType;
    // if (saleType === 'auction') {
    //   const minBid = upcomingSkuListing.minBid;
    //   return (
    //     <UpcomingData startDate={startDate} price={minBid} items={numItems} />
    //   );
    // } else if (saleType === 'fixed') {
    //   const price = upcomingSkuListing.price;
    //   return (
    //     <UpcomingData startDate={startDate} price={price} items={numItems} />
    //   );
    // }
  }

  /**
   * Active sku listing
   */
  if (activeListings.length && sku.totalSkuListingSupplyLeft) {
    const activeListing = activeListings?.[0];
    const skuPrice = activeListing?.price;
    const saleType = activeListing?.saleType;
    // TODO: When 'auction' saleType is implemented, the price should display bid price
    const displayPrice = saleType === 'fixed' ? skuPrice : skuPrice;

    return (
      <>
        <FromCreatorBox
          sku={sku}
          listing={activeListing}
          price={displayPrice}
          user={user}
          onBuyNow={onBuyNow}
          buttonDisabled={false}
          buttonLabel="Buy Now"
        />
        {/* <FromCollectorsBox
          minimunPrice={minCurrentBid}
          totalSupply={totalSupply}
          countProductListings={countProductListings}
        /> */}
      </>
    );
  }

  /**
   * Not for sale
   */
  if (sku.totalSkuSupplyLeft < 1 && numSkuListings) {
    const expiredListings = sku.skuListings.filter(
      (skuListing) => skuListing.status === 'expired'
    );
    const expiredListing = expiredListings[0];
    const skuPrice = expiredListing?.price;
    return (
      <>
        <FromCreatorBox
          sku={sku}
          listing={expiredListing}
          price={skuPrice}
          user={user}
          onBuyNow={onBuyNow}
          buttonDisabled={true}
          buttonLabel="Sold Out"
        />
      </>
    );
  }

  return <></>;
};

const Container = styled.div`
  padding: 0 80px 0 48px;
  height: 146px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;

  @media screen and (max-width: 600px) {
    height: auto;
    padding: 24px;
    flex-direction: column;
  }
`;

const BoxColumn = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  /* @media screen and (max-width: 600px) {

  } */
`;

const Button = styled.button`
  background-color: ${(props) => (props.disabled ? '#2D2D2D' : '#FFFFFF')};
  color: ${(props) => (props.disabled ? '#5F5F5F' : '#000000')};
  border: 0;
  height: 56px;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  border-radius: 22px;
  width: 186px;
  outline: none;
  font-size: 20px;
  font-weight: 600;

  @media screen and (max-width: 600px) {
    width: 100%;
    margin-top: 24px;
  }
`;

const Detail = styled.div`
  display: flex;
  width: 52%;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 600px) {
    justify-content: space-between;
    width: 100%;
  }
`;

export default SkuButtonBlock;
