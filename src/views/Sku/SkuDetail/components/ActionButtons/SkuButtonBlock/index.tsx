import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { formatDate } from 'utils/dates';
import Toast from 'utils/Toast';
import { Sku } from 'entities/sku';
import { User } from 'entities/user';
import { Collector } from 'entities/collector';
import { Listing } from 'entities/listing';
import { useAuth0 } from '@auth0/auth0-react';
import { useCountdown } from 'hooks/useCountdown';
import SkuPageModal from '../../ModalPayment/BuyNowModal/index';
import { useAppSelector } from 'store/hooks';
import * as S from './styles';
import { useMediaQuery } from '@material-ui/core';

interface IAuctionSale {
  startDate?: Date;
  price?: number;
  serialNumber?: string;
  owner?: User;
  endDate?: Date;
  state: 'active' | 'upcoming' | 'sold' | 'inactive';
  productId?: string;
  type?: string;
  sku?: Sku;
  user?: User;
  onProcessing?: () => void;
  listing?: Listing;
}

const AuctionSale = ({
  startDate,
  price,
  serialNumber,
  owner,
  endDate,
  state,
  type,
  productId,
  sku,
  user,
  onProcessing,
  listing,
}: IAuctionSale) => {
  const history = useHistory();
  const boxWidth = state === 'upcoming' || state === 'active' ? '62%' : '52%';
  const typeName = type === 'auction' ? 'Auction' : 'Sale';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const userBalance = useAppSelector(
    (state) => state.session.user?.availableBalance
  );
  const loggedInUserId = useAppSelector((state) => state.session.user.id);
  const hasFunds = price ? userBalance >= price : false;
  const modalMode = hasFunds ? 'hasFunds' : 'noFunds';
  const isSkuOwner = sku?.issuer._id === loggedInUserId;

  const handleBuyNowClick = () => {
    if (isAuthenticated) {
      if (isSkuOwner) {
        Toast.error('Cannot purchase your own SKU');
      } else {
        setIsModalOpen(true);
      }
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
    <>
      {' '}
      <S.Container>
        <S.Detail width={boxWidth}>
          {(state === 'upcoming' || state === 'active') && (
            <S.BoxColumn>
              {state === 'upcoming' && (
                <>
                  <S.BoxTitle>Upcoming {typeName}</S.BoxTitle>
                  <S.BoxSubtitle>
                    Starts {startDate && formatDate(startDate)}
                  </S.BoxSubtitle>
                </>
              )}
              {state === 'active' && (
                <>
                  <S.BoxTitle>Active {typeName}</S.BoxTitle>
                  <S.BoxSubtitle>
                    {type === 'auction'
                      ? `Ends ${endDate && formatDate(endDate)}`
                      : `Started ${startDate && formatDate(startDate)}`}
                  </S.BoxSubtitle>
                </>
              )}
            </S.BoxColumn>
          )}
          {(state === 'sold' || state === 'inactive') && (
            <S.SoldOutAuctionBox>
              <S.SerialNumber>#{serialNumber}</S.SerialNumber>
              <S.Slash>/</S.Slash>
              <S.BoxColumn style={{ justifyContent: 'normal' }}>
                <S.Text fontWeight={500} color="#7c7c7c" fontSize="16px">
                  Owner
                </S.Text>
                <S.Text fontWeight={500} color="white" fontSize="16px">
                  @{owner?.username}
                </S.Text>
              </S.BoxColumn>
            </S.SoldOutAuctionBox>
          )}
          {(state === 'upcoming' || state === 'active') && (
            <S.BoxColumn style={{ textAlign: 'center' }}>
              <S.Price>{price && `$${price}`}</S.Price>
              {type === 'auction' && (
                <small style={{ fontSize: '15px' }}>
                  {(state === 'upcoming' && '(Starting at)') ||
                    (state === 'active' && '(Highest bid)')}
                </small>
              )}
            </S.BoxColumn>
          )}
        </S.Detail>
        {type === 'fixed' && state === 'active' ? (
          <S.Button onClick={() => handleBuyNowClick()}>Buy Now</S.Button>
        ) : (
          <S.Button onClick={() => history.push(`/product/${productId}`)}>
            View NFT
          </S.Button>
        )}
        <SkuPageModal
          visible={isModalOpen}
          setModalPaymentVisible={setIsModalOpen}
          mode={modalMode}
          sku={sku as Sku}
          user={user}
          listing={listing as Listing}
          onProcessing={onProcessing}
        />
      </S.Container>
    </>
  );
};

interface IUpcomingData {
  startDate?: Date;
  price: number;
}

const UpcomingData = ({ startDate = new Date(), price }: IUpcomingData) => {
  const parsedStartDate = new Date(startDate);
  const countdown = useCountdown(parsedStartDate);
  const matchesMobile = useMediaQuery('(max-width: 960px)');

  return (
    <>
      {' '}
      <S.Container>
        <S.DetailsContainer>
          <S.BoxColumn alignItems={matchesMobile ? 'flex-start' : 'center'}>
            <S.BoxTitle>Upcoming</S.BoxTitle>
            <S.BoxSubtitle>{''}</S.BoxSubtitle>
            {matchesMobile && (
              <>
                <S.CountDownTime>{countdown}</S.CountDownTime>
                <S.StartDate style={{ justifyContent: 'flex-start' }}>
                  <S.FormatedDateContainer>
                    {formatDate(startDate).split('at')[0]}
                  </S.FormatedDateContainer>
                  <div>{' at ' + formatDate(startDate).split('at')[1]}</div>
                </S.StartDate>
              </>
            )}
          </S.BoxColumn>

          {!matchesMobile && (
            <S.BoxColumn alignItems="center">
              <S.CountDownTime>{countdown}</S.CountDownTime>
              <S.StartDate>
                <S.FormatedDateContainer>
                  {formatDate(startDate).split('at')[0]}
                </S.FormatedDateContainer>
                <div>{' at ' + formatDate(startDate).split('at')[1]}</div>
              </S.StartDate>
            </S.BoxColumn>
          )}

          <S.BoxColumn alignItems="center">
            <S.Price>${price}</S.Price>
          </S.BoxColumn>
        </S.DetailsContainer>
      </S.Container>
    </>
  );
};

interface IFromCreatorBox {
  sku: Sku;
  listing?: Listing;
  price?: number;
  user: User;
  buttonDisabled: boolean;
  buttonLabel: string;
  onProcessing?: () => void;
}

const FromCreatorBox = ({
  sku,
  listing,
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
  const loggedInUserId = useAppSelector((state) => state.session.user.id);
  const hasFunds = price ? userBalance >= price : false;
  const modalMode = hasFunds ? 'hasFunds' : 'noFunds';
  const isSkuOwner = sku?.issuer._id === loggedInUserId;

  const handleBuyNowClick = () => {
    if (isAuthenticated) {
      if (isSkuOwner) {
        Toast.error('Cannot purchase your own SKU');
      } else {
        setIsModalOpen(true);
      }
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
        <S.BoxColumn alignItems="center">
          <S.Price>{price && `$${price}`}</S.Price>
          {sku.supplyType === 'fixed' && (
            <small style={{ fontSize: '15px' }}>
              {sku?.totalSkuListingSupplyLeft >= 0 &&
                `(${sku?.totalSkuListingSupplyLeft} left)`}
            </small>
          )}
        </S.BoxColumn>
      </S.Detail>
      <S.Button disabled={buttonDisabled} onClick={handleBuyNowClick}>
        {buttonLabel}
      </S.Button>
      <SkuPageModal
        visible={isModalOpen}
        setModalPaymentVisible={setIsModalOpen}
        mode={modalMode}
        sku={sku as Sku}
        user={user}
        listing={listing as Listing}
        onProcessing={onProcessing}
      />
    </S.Container>
  );
};

interface IFromCollectorsBox {
  minimunPrice: number;
  countProductListings: number;
  skuId: string;
  circulatingSupply: number;
}

const FromCollectorsBox = ({
  minimunPrice,
  countProductListings,
  skuId,
  circulatingSupply,
}: IFromCollectorsBox): JSX.Element => {
  const history = useHistory();
  if (circulatingSupply === 0) {
    return <></>;
  } else {
    return (
      <S.Container>
        <S.Detail>
          <S.BoxColumn>
            <S.BoxTitle>From Collectors</S.BoxTitle>
            <S.BoxSubtitle>Lowest Listing Price</S.BoxSubtitle>
          </S.BoxColumn>
          <S.BoxColumn style={{ textAlign: 'center' }}>
            <S.Price>
              {' '}
              {!!countProductListings ? `$${minimunPrice}` : '--'}
            </S.Price>
            <small style={{ fontSize: '15px' }}>
              {!!countProductListings
                ? `(${countProductListings} for sale)`
                : `${countProductListings} on sale`}
            </small>
          </S.BoxColumn>
        </S.Detail>
        <S.SeeAllContainer>
          <S.Button onClick={() => history.push(`/${skuId}/collectors`)}>
            See All
          </S.Button>
        </S.SeeAllContainer>
      </S.Container>
    );
  }
};

interface ISkuButtonBlock {
  sku: Sku;
  user: User;
  collectors: Collector[];
  onProcessing?: () => void;
}

const SkuButtonBlock = ({
  sku,
  user,
  onProcessing,
  collectors,
}: ISkuButtonBlock): JSX.Element => {
  const numSkuListings = sku.skuListings.length;
  const activeListings = sku.skuListings.filter(
    (skuListing) => skuListing.status === 'active' && !skuListing.canceled
  );
  const upcomingSkuListings = sku.skuListings.filter(
    (skuListing) => skuListing.status === 'upcoming' && !skuListing.canceled
  );

  const activeProductListings = sku.productListings?.filter(
    (productListing) =>
      productListing.type === 'product' &&
      productListing.status === 'active' &&
      !productListing.canceled
  );
  const upcomingProductListings = sku.productListings?.filter(
    (productListing) =>
      productListing.type === 'product' &&
      productListing.status === 'upcoming' &&
      !productListing.canceled
  );

  /**
   * Single product auction or sale sku listing
   */
  if (
    !upcomingSkuListings.length &&
    !activeListings.length &&
    sku.totalSupply === 1
  ) {
    const {
      owner,
      serialNumber,
      listing: { startDate, endDate, price, saleType, status, product } = {},
      listing,
    } = collectors[0];
    const { minHighestBid } = sku;

    if (saleType === 'auction') {
      if (status === 'upcoming') {
        return (
          <AuctionSale
            startDate={startDate}
            price={minHighestBid}
            state="upcoming"
            productId={product}
            type={saleType}
          />
        );
      }
      if (status === 'active') {
        return (
          <AuctionSale
            endDate={endDate}
            price={minHighestBid}
            state="active"
            productId={product}
            type={saleType}
            sku={sku}
          />
        );
      }
      if (status === 'sold') {
        return (
          <AuctionSale
            state="sold"
            owner={owner}
            serialNumber={serialNumber}
            productId={product}
          />
        );
      }
    }
    if (saleType === 'fixed') {
      if (!activeProductListings && !upcomingProductListings) {
        return (
          <AuctionSale
            serialNumber={serialNumber}
            owner={owner}
            productId={product}
            state="inactive"
            sku={sku}
          />
        );
      }
      if (status === 'upcoming') {
        return (
          <AuctionSale
            serialNumber={serialNumber}
            owner={owner}
            productId={product}
            state={status}
            startDate={startDate}
            price={price}
            type={saleType}
          />
        );
      }

      if (status === 'active') {
        return (
          <AuctionSale
            serialNumber={serialNumber}
            owner={owner}
            productId={product}
            state={status}
            startDate={startDate}
            price={price}
            type={saleType}
            sku={sku}
            user={user}
            listing={listing}
            onProcessing={onProcessing}
          />
        );
      }
    }
  }

  /**
   * Upcoming sku listings
   */
  if (upcomingSkuListings.length > 0 && !activeListings.length) {
    const upcomingSkuListing = upcomingSkuListings[0];
    const startDate = upcomingSkuListing.startDate;
    const price = upcomingSkuListing.price;
    const numItems = upcomingSkuListing.supply;

    return <UpcomingData startDate={startDate} price={price} />;

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
          buttonDisabled={false}
          buttonLabel="Buy Now"
          onProcessing={onProcessing}
        />
        <FromCollectorsBox
          minimunPrice={sku?.minPrice}
          countProductListings={sku.countProductListings}
          skuId={sku._id}
          circulatingSupply={sku?.circulatingSupply}
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
          buttonDisabled={true}
          buttonLabel="Sold Out"
        />
        <FromCollectorsBox
          minimunPrice={sku?.minPrice}
          countProductListings={sku.countProductListings}
          skuId={sku._id}
          circulatingSupply={sku?.circulatingSupply}
        />
      </>
    );
  }
  return <></>;
};

export default SkuButtonBlock;
