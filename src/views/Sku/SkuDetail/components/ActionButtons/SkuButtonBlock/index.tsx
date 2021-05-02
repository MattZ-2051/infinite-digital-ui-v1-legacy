import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { formatCountdown, dateToPrettyString } from 'utils/dates';
import { Sku } from 'entities/sku';
import { User } from 'entities/user';
import { Collector } from 'entities/collector';
import Toast from 'utils/Toast';
import { useAppSelector } from 'store/hooks';
import { useAuth0 } from '@auth0/auth0-react';
import ModalPayment from '../../ModalPayment';
import { Listing } from 'entities/listing';

const NotAvailable = (): JSX.Element => {
  return (
    <Container>
      <h4>Not available</h4>
    </Container>
  );
};
interface IUpcomingData {
  startDate?: Date;
  price: number;
}

const UpcomingData = ({ startDate = new Date(), price }: IUpcomingData) => {
  const parsedStartDate = new Date(startDate);
  console.log(parsedStartDate);

  const [countdown, setCountdown] = useState(formatCountdown(parsedStartDate));
  // NOTE: Can be abstracted into a hook
  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(formatCountdown(parsedStartDate));
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  return (
    <>
      <Container>
        <span style={{ fontSize: '24px', color: '#8E8E8E' }}>Upcoming in:</span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'right',
          }}
        >
          <BoxColumn>
            <span style={{ fontSize: '28px' }}>Price:</span>
            <small style={{ fontSize: '15px' }}>{price}</small>
          </BoxColumn>
          <BoxColumn>
            <span style={{ fontSize: '24px' }}>{countdown}</span>
            <small style={{ fontSize: '15px', color: '#8E8E8E' }}>
              {dateToPrettyString(startDate)}
            </small>
          </BoxColumn>
        </div>
      </Container>
    </>
  );
};

interface IFromCreatorBox {
  sku: Sku;
  onBuyNow: () => void;
  price?: number;
  user: User;
  buttonDisabled: boolean;
  buttonLabel: string;
}

const FromCreatorBox = ({
  sku,
  onBuyNow,
  price,
  user,
  buttonDisabled,
  buttonLabel,
}: IFromCreatorBox): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const hasFunds = price ? user.availableBalance >= price : false;
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

  const activeListings = sku.skuListings.filter(
    (skuListings) => skuListings.status == 'active'
  );
  const activeListing = activeListings[0];

  return (
    <Container>
      <BoxColumn>
        <h4 style={{ fontSize: '24px', color: '#8E8E8E' }}>From Creator</h4>
        <small style={{ fontSize: '15px', color: '#8E8E8E' }}>
          Initial Release
        </small>
      </BoxColumn>
      <BoxColumn style={{ textAlign: 'center' }}>
        <span style={{ fontSize: '28px' }}>${price}</span>
        <small style={{ fontSize: '15px' }}>
          ({sku.totalSkuSupplyLeft} left)
        </small>
      </BoxColumn>
      <div>
        <Button disabled={buttonDisabled} onClick={() => handleBuyNowClick()}>
          {buttonLabel}
        </Button>
      </div>
      <ModalPayment
        visible={isModalOpen}
        setModalPaymentVisible={setIsModalOpen}
        mode={modalMode}
        sku={sku}
        user={user}
        listing={activeListing}
      />
    </Container>
  );
};

interface IFromCollectorsBox {
  minimunPrice: number;
  countProductListings: number;
  totalSupply?: any;
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
  onBuyNow: any;
  collectors: Collector[];
}

const SkuButtonBlock = ({
  sku,
  user,
  onBuyNow,
  collectors,
}: ISkuButtonBlock): JSX.Element => {
  const hasSkuListings = sku.skuListings.length > 0;

  if (!hasSkuListings) {
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
            user={user}
            onBuyNow={onBuyNow}
            buttonDisabled={true}
            buttonLabel="Not for sale"
          />
        </>
      );
    }
  }

  if (sku.totalSupply === 0 && sku.totalSupplyUpcoming > 0) {
    const upcomingSkuListings = sku.skuListings.filter(
      (skuListing) => skuListing.status === 'upcoming'
    );
    const startDate = upcomingSkuListings[0].startDate;
    const price = upcomingSkuListings[0].price;
    return <UpcomingData startDate={startDate} price={price} />;
  }

  if (sku.totalSkuSupplyLeft > 0) {
    const activeSkus = sku.skuListings.filter(
      (skuListing) => skuListing.status === 'active'
    );
    const skuPrice = activeSkus[0].price;
    return (
      <>
        <FromCreatorBox
          sku={sku}
          price={skuPrice}
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

  if (sku.totalSkuSupplyLeft < 1 && hasSkuListings) {
    const expiredSkus = sku.skuListings.filter(
      (skuListing) => skuListing.status === 'expired'
    );
    const skuPrice = expiredSkus[0].price;
    return (
      <>
        <FromCreatorBox
          sku={sku}
          price={skuPrice}
          user={user}
          onBuyNow={onBuyNow}
          buttonDisabled={true}
          buttonLabel="Sold Out"
        />
      </>
    );
  }

  return <NotAvailable />;
};

const Container = styled.div`
  padding: 0 80px 0 48px;
  height: 146px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
`;

const BoxColumn = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
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
  font-family: 'josefin-sans';
`;

export default SkuButtonBlock;
