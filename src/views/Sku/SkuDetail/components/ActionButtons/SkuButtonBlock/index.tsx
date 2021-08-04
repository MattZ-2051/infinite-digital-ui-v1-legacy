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
import { claimGiveaway } from 'services/api/listingService';
import { ClipLoader } from 'react-spinners';

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
  const matchesMobile = useMediaQuery('(max-width: 960px)');

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
            <S.BoxColumn alignItems="flex-start">
              {state === 'upcoming' && (
                <>
                  <S.BoxTitle>Upcoming {typeName}</S.BoxTitle>
                  <S.BoxSubtitle style={{ textAlign: 'left' }}>
                    Starts {startDate && formatDate(startDate)}
                  </S.BoxSubtitle>
                </>
              )}
              {state === 'active' && (
                <>
                  <S.BoxTitle>Active {typeName}</S.BoxTitle>
                  <S.BoxSubtitle style={{ textAlign: 'start' }}>
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
  sku: Sku;
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
      {listing?.price && (
        <SkuPageModal
          visible={isModalOpen}
          setModalPaymentVisible={setIsModalOpen}
          mode={modalMode}
          sku={sku as Sku}
          user={user}
          listing={listing as Listing}
          onProcessing={onProcessing}
        />
      )}
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

interface IGiveawayBox {
  giveawayState?: string;
  startDate?: Date;
  endDate?: Date;
  serialNumber?: string;
  issuer: User;
  productId?: string;
  supply?: number;
  isOpenEdition?: boolean;
  listing: Listing;
}

const GiveawayBox = ({
  giveawayState,
  startDate,
  endDate,
  issuer,
  supply,
  isOpenEdition,
  listing,
}: IGiveawayBox): JSX.Element => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const loggedInUserId = useAppSelector((state) => state.session.user.id);
  const isSkuOwner = issuer._id === loggedInUserId;
  const history = useHistory();
  const [minting, setMinting] = useState<boolean>(false);
  const matchesMobile = useMediaQuery('(max-width: 960px)');
  const boxWidth =
    giveawayState === 'upcoming' || giveawayState === 'active' ? '62%' : '52%';

  const handleGiveawayClaim = async () => {
    setMinting(true);
    Toast.success(
      <>
        Wohoo we are minting your NFT! This page will refresh and visit your
        collection when the NFT is ready
      </>,
      'processing'
    );
    try {
      const claimRes = await claimGiveaway(
        await getAccessTokenSilently(),
        listing._id
      );
      if (claimRes.status === 201) {
        Toast.dismiss('processing');
        Toast.success(
          <>
            Your NFT is minted! You&apos;ll be taken to your collection to view
            the NFT
          </>
        );
        setTimeout(() => {
          setMinting(false);
          history.push(`/product/${claimRes.data._id}`);
        }, 5000);
      } else {
        setMinting(false);
        Toast.dismiss('processing');
        Toast.error(
          <>
            Please try again, see the <a href="/help">Help page</a> to learn
            more.
          </>
        );
      }
    } catch (error) {
      setMinting(false);
      if (error?.response?.status === 400) {
        Toast.dismiss('processing');
        Toast.error(<>{error.response.message}</>);
      } else {
        Toast.dismiss('processing');
        Toast.error(
          <>
            Please try again, see the <a href="/help">Help page</a> to learn
            more.
          </>
        );
      }
    }
  };

  const handleMintClick = () => {
    if (isAuthenticated) {
      if (isSkuOwner) {
        Toast.error('Cannot claim your own SKU');
      } else {
        handleGiveawayClaim();
      }
    } else {
      Toast.warning(
        <>
          You need to be{' '}
          <a onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>
            logged in
          </a>{' '}
          in order to claim
        </>
      );
    }
  };

  return (
    <S.Container>
      <S.Detail width={boxWidth}>
        {(giveawayState === 'upcoming' || giveawayState === 'active') && (
          <S.BoxColumn alignItems="flex-start">
            {giveawayState === 'upcoming' && (
              <>
                <S.BoxTitle>NFT Giveaway</S.BoxTitle>
                <S.BoxSubtitle>
                  Starts {startDate && formatDate(startDate)}
                </S.BoxSubtitle>
              </>
            )}
            {giveawayState === 'active' && (
              <>
                <S.BoxTitle>NFT Giveaway</S.BoxTitle>
                <S.BoxSubtitle style={{ textAlign: 'left' }}>
                  Ends {endDate && formatDate(endDate)}
                </S.BoxSubtitle>
              </>
            )}
          </S.BoxColumn>
        )}
        {(giveawayState === 'upcoming' || giveawayState === 'active') && (
          <S.BoxColumn
            alignItems={matchesMobile ? 'flex-end' : 'center'}
            style={{ flexBasis: '10ch' }}
          >
            <S.Amount>{(isOpenEdition && <>&#8734;</>) || supply}</S.Amount>
            <small style={{ fontSize: '15px' }}>
              {isOpenEdition
                ? 'Open Edition'
                : (giveawayState === 'upcoming' && 'To be released') ||
                  (giveawayState === 'active' && 'Remaining')}
            </small>
          </S.BoxColumn>
        )}
      </S.Detail>
      {(giveawayState === 'upcoming' || giveawayState === 'active') && (
        <>
          {giveawayState === 'upcoming' && (
            <S.Button disabled={true}>Upcoming NFT</S.Button>
          )}
          {giveawayState === 'active' && (
            <S.Button onClick={handleMintClick} disabled={minting}>
              {minting ? (
                <S.CenteredSpaced>
                  <span>Minting</span>
                  <ClipLoader size={20} color="currentColor" />
                </S.CenteredSpaced>
              ) : (
                'Mint Your NFT'
              )}
            </S.Button>
          )}
        </>
      )}
    </S.Container>
  );
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
   * Giveaway sku Listing
   */
  if (activeListings[0]?.saleType === 'giveaway') {
    const { status, startDate, endDate, supplyLeft } = activeListings[0];

    return (
      <GiveawayBox
        giveawayState={status}
        startDate={startDate}
        endDate={endDate}
        supply={supplyLeft}
        isOpenEdition={sku.supplyType === 'variable'}
        listing={activeListings[0]}
        issuer={sku.issuer}
      />
    );
  }

  if (upcomingSkuListings[0]?.saleType === 'giveaway') {
    const { status, startDate, endDate, supplyLeft } = upcomingSkuListings[0];
    return (
      <GiveawayBox
        giveawayState={status}
        startDate={startDate}
        endDate={endDate}
        supply={supplyLeft}
        isOpenEdition={sku.supplyType === 'variable'}
        listing={upcomingSkuListings[0]}
        issuer={sku.issuer}
      />
    );
  }

  /**
   * Upcoming Auction sku Listing
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
            sku={sku}
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
            sku={sku}
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
            sku={sku}
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

    return <UpcomingData startDate={startDate} price={price} sku={sku} />;

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
