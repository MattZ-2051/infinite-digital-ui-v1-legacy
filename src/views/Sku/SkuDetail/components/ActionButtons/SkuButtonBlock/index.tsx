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

interface IUpcomingAuction {
  startDate?: Date;
  price?: number;
  serialNumber?: string;
  owner?: User;
  endDate?: Date;
  auctionState: 'active' | 'upcoming' | 'sold';
  productId?: string;
}

const UpcomingAuction = ({
  startDate,
  price,
  serialNumber,
  owner,
  endDate,
  auctionState,
  productId,
}: IUpcomingAuction) => {
  const history = useHistory();
  const boxWidth =
    auctionState === 'upcoming' || auctionState === 'active' ? '62%' : '52%';
  return (
    <>
      {' '}
      <S.Container>
        <S.Detail width={boxWidth}>
          {(auctionState === 'upcoming' || auctionState === 'active') && (
            <S.BoxColumn>
              {auctionState === 'upcoming' && (
                <>
                  <S.BoxTitle>Upcoming Auction</S.BoxTitle>
                  <S.BoxSubtitle>
                    Starts {startDate && formatDate(startDate)}
                  </S.BoxSubtitle>
                </>
              )}
              {auctionState === 'active' && (
                <>
                  <S.BoxTitle>Active Auction</S.BoxTitle>
                  <S.BoxSubtitle>
                    Ends {endDate && formatDate(endDate)}
                  </S.BoxSubtitle>
                </>
              )}
            </S.BoxColumn>
          )}
          {auctionState === 'sold' && (
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
          {(auctionState === 'upcoming' || auctionState === 'active') && (
            <S.BoxColumn style={{ textAlign: 'center' }}>
              <S.Price>{price && `$${price}`}</S.Price>
              <small style={{ fontSize: '15px' }}>
                {(auctionState === 'upcoming' && '(Starting at)') ||
                  (auctionState === 'active' && '(Highest bid)')}
              </small>
            </S.BoxColumn>
          )}
        </S.Detail>
        <S.Button onClick={() => history.push(`/product/${productId}`)}>
          View NFT
        </S.Button>
      </S.Container>
    </>
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
  const matchesMobile = useMediaQuery('(max-width: 960px)');

  return (
    <>
      {' '}
      <S.Container>
        <S.DetailsContainer>
          <S.Detail style={{ alignItems: 'flex-start' }}>
            <S.BoxColumn>
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
            <S.BoxColumn style={{ textAlign: 'center' }}>
              <S.Price>${price}</S.Price>
              {/* {supplyType !== 'variable' && (
                <small style={{ fontSize: '15px' }}>
                  {items && `(${items} NFTs)`}
                </small>
              )} */}
            </S.BoxColumn>
          </S.Detail>
          {!matchesMobile && (
            <S.BoxColumn style={{ textAlign: 'right' }}>
              <S.CountDownTime>{countdown}</S.CountDownTime>
              <S.StartDate style={{ justifyContent: 'flex-end' }}>
                <S.FormatedDateContainer>
                  {formatDate(startDate).split('at')[0]}
                </S.FormatedDateContainer>
                <div>{' at ' + formatDate(startDate).split('at')[1]}</div>
              </S.StartDate>
            </S.BoxColumn>
          )}
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
      <S.Button disabled={buttonDisabled} onClick={handleBuyNowClick}>
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

  /**
   * Upcoming Auction sku Listing
   */
  if (
    !upcomingSkuListings.length &&
    !activeListings.length &&
    sku.totalSupply === 1
  ) {
    const listing = collectors[0]?.listing;
    const startDate = listing?.startDate;
    const endDate = listing?.endDate;
    const price = sku?.minHighestBid;
    const owner = collectors[0]?.owner;
    const serialNumber = collectors[0]?.serialNumber;
    const isAuction = listing?.saleType === 'auction';
    const productId = collectors[0]?.listing?.product;

    if (isAuction) {
      if (listing.status === 'upcoming') {
        return (
          <UpcomingAuction
            startDate={startDate}
            price={price}
            auctionState="upcoming"
            productId={productId}
          />
        );
      }
      if (listing.status === 'active') {
        return (
          <UpcomingAuction
            endDate={endDate}
            price={price}
            auctionState="active"
            productId={productId}
          />
        );
      }
      if (listing.status === 'sold') {
        return (
          <UpcomingAuction
            auctionState="sold"
            owner={owner}
            serialNumber={serialNumber}
            productId={productId}
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
