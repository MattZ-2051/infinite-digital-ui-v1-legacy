import { useEffect } from 'react';
import { ProductWithFunctions } from 'entities/product';
import { useMediaQuery } from '@material-ui/core';
import * as S2 from './styles';
import * as S from '../../styles';
import { Util } from '../../util';
import { formatDate } from 'utils/dates';
import { showStatusBarWarningMessage } from '../../toastMessages';
import { AuctionStatus, HistoryStatus, Modes } from '../../types';
import { useCountdown } from 'hooks/useCountdown';

const statusBarWarningMessages = {
  processingAuctionWarning:
    'This auction has ended and is processing to confirm the winner. Please refresh the page to view the updated status.',
  activeAuctionWarning:
    'This Auction is currently active and has bids placed, you can no longer cancel.',
};

interface IProps {
  util: Util;
  auctionStatus: AuctionStatus;
  historyStatus: HistoryStatus;
  handlers: any;
  listingStatus: Modes;
  setBidAmount: (val?: any) => void;
  setAuctionStatus: (status: AuctionStatus) => void;
}

interface StatusInfoProps {
  leftText: string;
  leftTextSubHeader: Date;
  price?: number;
  priceSubHeader?: string;
  product?: ProductWithFunctions;
  buttonText: string;
  buttonActive: boolean;
  onClick?: () => any;
  date?: string;
  PlaceBidButton?: JSX.Element;
}

const StatusInfo = ({
  leftText,
  price,
  priceSubHeader,
  leftTextSubHeader,
  buttonText,
  buttonActive,
  onClick,
  date,
  PlaceBidButton,
}: StatusInfoProps) => {
  const matchesMobile = useMediaQuery('(max-width: 900px)');

  return (
    <S2.Container>
      <S2.InfoContainer>
        <S.Row
          alignItems="flex-start"
          flexDirection="column"
          justifyContent="center"
        >
          <S.Text fontWeight={600} color="#9DA1A8" size="18px" padding="0">
            {leftText} {date && <span style={{ color: 'white' }}>{date}</span>}
          </S.Text>
          <S.Text
            fontWeight={500}
            color="#9DA1A8"
            size="14px"
            padding="6px 0 0 0"
          >
            {matchesMobile ? (
              <>
                {formatDate(leftTextSubHeader).split('at')[0]} <br />{' '}
                {formatDate(leftTextSubHeader).split('at')[1]}
              </>
            ) : (
              formatDate(leftTextSubHeader)
            )}
          </S.Text>
        </S.Row>
        <S.Row flexDirection="row" alignItems="cente" justifyContent="flex-end">
          <S.Row
            flexDirection="column"
            alignItems="flex-end"
            justifyContent={matchesMobile ? 'flex-start' : 'center'}
            padding={matchesMobile ? '0' : '0 24px 0 0'}
          >
            {price && (
              <S.Text
                fontWeight={600}
                color="white"
                size="18px"
                padding="0"
                textAlign="end"
              >
                ${price}
              </S.Text>
            )}
            {priceSubHeader && (
              <S.Text
                fontWeight={400}
                color="#9DA1A8"
                size="14px"
                padding="6px 0 0 0"
              >
                {priceSubHeader}
              </S.Text>
            )}
          </S.Row>
          {PlaceBidButton && !matchesMobile && PlaceBidButton}
          {!matchesMobile && !PlaceBidButton && (
            <S.Button
              width="228px"
              height="56px"
              hover={buttonActive}
              fontSize="20px"
              onClick={onClick}
            >
              {buttonText}
            </S.Button>
          )}
        </S.Row>
      </S2.InfoContainer>
      {matchesMobile && !PlaceBidButton && (
        <S.Row flexDirection="row" justifyContent="center" alignItems="center">
          <S.Button
            width={matchesMobile ? '90%' : '228px'}
            height="56px"
            hover={buttonActive}
            fontSize="20px"
            onClick={onClick}
            style={{ marginBottom: matchesMobile ? '16px' : '' }}
          >
            {buttonText}
          </S.Button>
        </S.Row>
      )}
      {matchesMobile && PlaceBidButton && PlaceBidButton}
    </S2.Container>
  );
};

const PlaceBidButton = ({ setBidAmount, handlers, util }): JSX.Element => {
  return (
    <S2.PlaceBidButtonContainer>
      <S2.AmountInput
        name="amount-input"
        placeholder={`$ Place a higher bid`}
        decimalsLimit={2}
        onValueChange={(val) => setBidAmount(val)}
        defaultValue={0.0}
        maxLength={10}
        allowNegativeValue={false}
        value={util.bidAmount ? util.bidAmount : ''}
        step={10}
      />
      <S2.PlaceBidButton active={!!util.bidAmount} onClick={handlers.handleBid}>
        Place Bid
      </S2.PlaceBidButton>
    </S2.PlaceBidButtonContainer>
  );
};

export const StatusBar = ({
  util,
  auctionStatus,
  historyStatus,
  handlers,
  listingStatus,
  setBidAmount,
  setAuctionStatus,
}: IProps) => {
  const isPastAuction = util.isPastAuction();
  const isUpcomingAuction = util.isUpcomingAuction();
  const expiredListing =
    util.product?.expiredProductListings[
      util.product?.expiredProductListings.length - 1
    ];
  const isActiveListing = historyStatus === 'buy-now';
  const activeListing = util?.product?.activeProductListings[0];
  const upcomingListing = util?.product?.upcomingProductListings[0];
  const highestCurrentBid = util?.bids[0]?.bidAmt;
  const countdownToActiveListingEndDate = useCountdown(
    new Date(activeListing?.endDate)
  );
  const countdownToUpcomingListingStartDate = useCountdown(
    new Date(upcomingListing?.startDate)
  );

  useEffect(() => {
    if (isPastAuction && expiredListing && highestCurrentBid) {
      showStatusBarWarningMessage(
        statusBarWarningMessages.processingAuctionWarning
      );
    }
    if (isUpcomingAuction) {
      setAuctionStatus(util.getAuctionStatus());
    }
  }, []);

  return (
    <>
      {isPastAuction && expiredListing && highestCurrentBid && (
        <StatusInfo
          leftText="Auction Ended"
          leftTextSubHeader={expiredListing?.endDate}
          price={highestCurrentBid}
          priceSubHeader="Winning Bid"
          buttonText="Processing..."
          buttonActive={false}
          onClick={() =>
            showStatusBarWarningMessage(
              statusBarWarningMessages.processingAuctionWarning
            )
          }
        />
      )}
      {isActiveListing && activeListing && listingStatus !== 'processing' && (
        <StatusInfo
          leftText="Started at"
          leftTextSubHeader={activeListing?.startDate}
          buttonText={`Buy Now for $${activeListing?.price}`}
          buttonActive={true}
          onClick={handlers.handleSaleAction}
        />
      )}
      {auctionStatus === 'active-auction-no-bid-owner' && (
        <StatusInfo
          leftText={'Expires in'}
          leftTextSubHeader={activeListing?.endDate}
          price={activeListing?.minBid}
          priceSubHeader="Starting Price"
          buttonText="Cancel Auction"
          date={countdownToActiveListingEndDate}
          buttonActive={true}
          onClick={handlers.handleCancelSale}
        />
      )}
      {historyStatus === 'active-sale' && (
        <StatusInfo
          leftText="Started at"
          leftTextSubHeader={activeListing?.startDate}
          buttonText="Cancel Sale"
          price={activeListing?.price}
          priceSubHeader="Sale price"
          buttonActive={true}
          onClick={handlers.handleCancelSale}
        />
      )}
      {auctionStatus === 'active-auction-bid-owner' && (
        <StatusInfo
          leftText={'Expires in'}
          leftTextSubHeader={activeListing?.endDate}
          price={activeListing?.minBid}
          priceSubHeader="Starting Price"
          buttonText="Cancel Auction"
          date={countdownToActiveListingEndDate}
          buttonActive={false}
          onClick={() =>
            showStatusBarWarningMessage(
              statusBarWarningMessages.activeAuctionWarning
            )
          }
        />
      )}
      {auctionStatus === 'upcoming-auction-owner' && (
        <StatusInfo
          leftText={'Starts in'}
          leftTextSubHeader={upcomingListing?.startDate}
          price={upcomingListing?.minBid}
          priceSubHeader="Starting Price"
          buttonText="Cancel Auction"
          date={countdownToUpcomingListingStartDate}
          buttonActive={true}
          onClick={handlers.handleCancelSale}
        />
      )}
      {auctionStatus === 'upcoming-auction-user' && (
        <StatusInfo
          leftText={'Starts in'}
          leftTextSubHeader={upcomingListing?.startDate}
          price={upcomingListing?.minBid}
          priceSubHeader="Starting Price"
          buttonText="Upcoming Auction"
          date={countdownToUpcomingListingStartDate}
          buttonActive={false}
        />
      )}
      {historyStatus === 'upcoming-sale' && (
        <StatusInfo
          leftText={'Starts in'}
          leftTextSubHeader={upcomingListing?.startDate}
          price={upcomingListing?.price}
          priceSubHeader="Sale Price"
          buttonText="Upcoming Sale"
          date={countdownToUpcomingListingStartDate}
          buttonActive={false}
        />
      )}
      {listingStatus === 'processing' && (
        <StatusInfo
          leftText={'Sale Ended'}
          leftTextSubHeader={activeListing?.startDate}
          price={activeListing?.price}
          priceSubHeader="Sold Price"
          buttonText="Processing..."
          buttonActive={true}
        />
      )}
      {(auctionStatus === 'active-auction-bid-user' ||
        auctionStatus === 'active-auction-no-bid-user') && (
        <>
          <StatusInfo
            leftText={'Ends in'}
            date={countdownToActiveListingEndDate}
            leftTextSubHeader={activeListing?.endDate}
            price={
              highestCurrentBid ? highestCurrentBid : activeListing?.minBid
            }
            priceSubHeader="Current Bid"
            buttonText="Place Bid"
            buttonActive={true}
            PlaceBidButton={
              <PlaceBidButton
                handlers={handlers}
                util={util}
                setBidAmount={setBidAmount}
              />
            }
          />
        </>
      )}
    </>
  );
};
