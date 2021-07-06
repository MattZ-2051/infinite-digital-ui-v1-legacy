import { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import * as S from './styles';

const NotAvailable = (): JSX.Element => {
  return (
    <S.Container>
      <h4>Not available</h4>
    </S.Container>
  );
};
const ComingSoon = (): JSX.Element => {
  return (
    <S.Container>
      <h4>Coming soon...</h4>
    </S.Container>
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

  return (
    <>
      {' '}
      <S.Container>
        <S.BoxColumn>
          <S.BoxTitle>Upcoming</S.BoxTitle>
          <S.BoxSubtitle>{''}</S.BoxSubtitle>
        </S.BoxColumn>
        <S.BoxColumn style={{ textAlign: 'center' }}>
          <S.Price>${price}</S.Price>
          {supplyType !== 'variable' && (
            <small style={{ fontSize: '15px' }}>
              {items && `(${items} items)`}
            </small>
          )}
        </S.BoxColumn>
        <S.BoxColumn style={{ textAlign: 'right' }}>
          <S.CountDownTime>{countdown}</S.CountDownTime>
          <S.StartDate>{formatDate(startDate)}</S.StartDate>
        </S.BoxColumn>
      </S.Container>
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
  onProcessing?: () => void;
}

const FromCreatorBox = ({
  sku,
  listing,
  onBuyNow,
  price,
  user,
  buttonDisabled,
  buttonLabel,
  onProcessing,
}: IFromCreatorBox): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const userBalance = useAppSelector(
    (state) => state.session.user?.availableBalance
  );
  const hasFunds = price ? userBalance >= price : false;
  const modalMode = hasFunds ? 'hasFunds' : 'noFunds';

  const handleBuyNowClick = () => {
    // TODO: Check this call with pablo
    onBuyNow();
    if (isAuthenticated) {
      setIsModalOpen(true);
    } else {
      Toast.warning(
        <>
          You need to be{' '}
          <a onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>
            logged in
          </a>{' '}
          in order to complete a purchase
        </>
      );
    }
  };

  return (
    <S.Container>
      <S.Detail>
        <S.BoxColumn>
          <S.BoxTitle>From Creator</S.BoxTitle>
          <S.BoxSubtitle>Initial Release</S.BoxSubtitle>
        </S.BoxColumn>
        <S.BoxColumn style={{ textAlign: 'center' }}>
          <S.Price>{price && `$${price}`}</S.Price>
          {sku.supplyType === 'fixed' && (
            <small style={{ fontSize: '15px' }}>
              {sku?.totalSkuListingSupplyLeft >= 0 &&
                `(${sku?.totalSkuListingSupplyLeft} left)`}
            </small>
          )}
        </S.BoxColumn>
      </S.Detail>
      <S.Button disabled={buttonDisabled} onClick={() => handleBuyNowClick()}>
        {buttonLabel}
      </S.Button>
      <SkuPageModal
        visible={isModalOpen}
        setModalPaymentVisible={setIsModalOpen}
        mode={modalMode}
        sku={sku}
        user={user}
        listing={listing}
        onProcessing={onProcessing}
      />
    </S.Container>
  );
};

interface IFromCollectorsBox {
  minimunPrice: number;
  countProductListings: number;
  skuId: string;
}

const FromCollectorsBox = ({
  minimunPrice,
  countProductListings,
  skuId,
}: IFromCollectorsBox): JSX.Element => {
  const history = useHistory();
  return (
    <S.Container>
      <S.BoxColumn>
        <S.BoxTitle>From Collectors</S.BoxTitle>
        <S.BoxSubtitle>Lowest Listing Price</S.BoxSubtitle>
      </S.BoxColumn>
      <S.BoxColumn style={{ textAlign: 'center' }}>
        <S.Price> {!!countProductListings ? `$${minimunPrice}` : '--'}</S.Price>
        <small style={{ fontSize: '15px' }}>
          {!!countProductListings
            ? `(${countProductListings} for sale)`
            : `${countProductListings} on sale`}
        </small>
      </S.BoxColumn>
      <div>
        <S.Button onClick={() => history.push(`/${skuId}/collectors`)}>
          See All
        </S.Button>
      </div>
    </S.Container>
  );
};

interface ISkuButtonBlock {
  sku: Sku;
  user: User;
  onBuyNow: () => void;
  collectors: Collector[];
  onProcessing?: () => void;
}

const SkuButtonBlock = ({
  sku,
  user,
  onBuyNow,
  collectors,
  onProcessing,
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

  // if (!numSkuListings || sku.totalSkuSupplyLeft === 0) {
  //   return <></>; // Returning empty for now
  //   // need to remove this return after MVP
  //   // This scenario is for the direct product listing (post-MVP)

  //   // this is STATE 0 = 1 product listing only = no sku listings
  //   const upcomingProductListings = collectors.filter(
  //     (collector) => collector.upcomingProductListing
  //   );
  //   if (upcomingProductListings.length > 0) {
  //     const upcomingProductListing =
  //       upcomingProductListings[0].upcomingProductListing;
  //     if (upcomingProductListing?.saleType === 'fixed') {
  //       // Price attribute: upcomingProductListing.price
  //       return <> return countdown timer for upcoming </>;
  //     } else if (upcomingProductListing?.saleType === 'auction') {
  //       // Price attribute: upcomingProductListing.minBid
  //       return <> auction scenario - return countdown timer</>;
  //     }
  //   }
  //   const activeProductListings = collectors.filter(
  //     (collector) => collector.activeProductListing
  //   );
  //   if (activeProductListings.length > 0) {
  //     const activeProductListing =
  //       activeProductListings[0].activeProductListing;
  //     return <> {activeProductListing?.price} </>;
  //   }
  //   if (
  //     upcomingProductListings.length === 0 &&
  //     activeProductListings.length === 0
  //   ) {
  //     // This is a product listing
  //     return (
  //       <>
  //         <FromCreatorBox
  //           sku={sku}
  //           listing={undefined}
  //           user={user}
  //           onBuyNow={onBuyNow}
  //           buttonDisabled={true}
  //           buttonLabel="Not for sale"
  //         />
  //       </>
  //     );
  //   }
  // }

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
          onProcessing={onProcessing}
        />
        <FromCollectorsBox
          minimunPrice={sku?.minPrice}
          countProductListings={sku.countProductListings}
          skuId={sku._id}
        />
      </>
    );
  }

  /**
   * Not for sale
   */
  if (sku.totalSkuListingSupplyLeft === 0 && !!numSkuListings) {
    const expiredListings = sku.skuListings.filter(
      (skuListing) => skuListing.status === 'sold'
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
        <FromCollectorsBox
          minimunPrice={sku?.minPrice}
          countProductListings={sku.countProductListings}
          skuId={sku._id}
        />
      </>
    );
  }

  return <></>;
};

export default SkuButtonBlock;
