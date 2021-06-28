import * as S from '../styles';
import Transaction from '../Transaction';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BidIcon from 'assets/img/icons/bid-dollar-icon.png';
import { formatCountdown, formatDate } from 'utils/dates';
export const Auction = ({
  util,
  handlers,
  auctionStatus,
  setBidAmount,
  themeStyle,
  totalBids,
}) => {
  const matchesMobile = useMediaQuery('(max-width:1140px)');

  return (
    <>
      <S.TransactionHistory>
        {util.product?.upcomingProductListings.length !== 0 ? (
          <S.BidsContainer padding="22px 0px">
            <S.Text color="white" size="18px" fontWeight={600}>
              Starts at ${util.product?.upcomingProductListings[0].minBid} in{' '}
              {util.product?.upcomingProductListings[0].startDate &&
                formatCountdown(
                  new Date(util.product.upcomingProductListings[0].startDate)
                )}{' '}
            </S.Text>
            <S.Text color="#7c7c7c" size="14px" fontWeight={400}>
              (
              {util.product?.upcomingProductListings[0].startDate &&
                formatDate(
                  new Date(util.product.upcomingProductListings[0].startDate)
                )}
              )
            </S.Text>
          </S.BidsContainer>
        ) : util.bids.length === 0 &&
          auctionStatus === 'active-auction-no-bid-owner' ? (
          <>
            <S.BidsContainer padding="32px 0px">
              No bids placed yet
            </S.BidsContainer>
            <S.TextContainer paddingTop="32px">
              <S.Text color="#9e9e9e" size="16px" fontWeight={600}>
                Started at
              </S.Text>
              <S.Text color="white" size="16px" fontWeight={600}>
                ${util.product?.activeProductListings[0].minBid}
              </S.Text>{' '}
              <S.Text color="#9e9e9e" size="16px" fontWeight={500}>
                on
              </S.Text>
              <S.Text color="#9e9e9e" size="16px" fontWeight={500}>
                {util.product?.activeProductListings[0] &&
                  `${formatDate(
                    new Date(util.product?.activeProductListings[0].startDate)
                  )}`}
              </S.Text>
            </S.TextContainer>
          </>
        ) : auctionStatus === 'active-auction-bid-owner' ? (
          <S.BidsHistory>
            {util.bids instanceof Array &&
              util.bids.map((bid) => {
                return <Transaction key={bid._id} bid={bid} />;
              })}
          </S.BidsHistory>
        ) : (
          (auctionStatus === 'active-auction-bid-user' ||
            auctionStatus === 'active-auction-no-bid-user') && (
            <S.BidsHistory>
              {matchesMobile ? (
                <S.MobileContainer>
                  <S.FlexDiv width="100%">
                    <img src={BidIcon} alt="" />
                    <S.AmountInput
                      name="amount-input"
                      placeholder={`Place a bid higher or equal to $${util.getMinBid()}`}
                      decimalsLimit={2}
                      onValueChange={(val) => setBidAmount(val)}
                      defaultValue={0.0}
                      maxLength={10}
                      allowNegativeValue={false}
                      value={util.bidAmount ? util.bidAmount : ''}
                      step={10}
                    />
                  </S.FlexDiv>
                  <S.PlaceBidButton
                    active={!!util.bidAmount}
                    onClick={handlers.handleBid}
                    width="100%"
                  >
                    Place Bid
                  </S.PlaceBidButton>
                </S.MobileContainer>
              ) : (
                <S.PlaceBidsContainer>
                  <S.FlexDiv width="65%">
                    <img src={BidIcon} alt="" />
                    <S.AmountInput
                      name="amount-input"
                      placeholder={`Place a bid higher or equal to $${util.getMinBid()}`}
                      decimalsLimit={2}
                      onValueChange={(val) => setBidAmount(val)}
                      defaultValue={0.0}
                      maxLength={10}
                      allowNegativeValue={false}
                      value={util.bidAmount ? util.bidAmount : ''}
                      step={10}
                    />
                  </S.FlexDiv>
                  <S.PlaceBidButton
                    active={!!util.bidAmount}
                    onClick={handlers.handleBid}
                  >
                    Place Bid
                  </S.PlaceBidButton>
                </S.PlaceBidsContainer>
              )}

              {util.bids instanceof Array &&
                util.bids.map((bid) => {
                  return <Transaction key={bid._id} bid={bid} />;
                })}
            </S.BidsHistory>
          )
        )}
        {auctionStatus !== 'upcoming-auction' &&
          auctionStatus !== 'active-auction-no-bid-owner' &&
          auctionStatus !== 'active-auction-no-bid-user' &&
          (matchesMobile ? (
            <S.FlexColumn alignItems="center" padding="32px 0 0 0">
              {(util.product?.activeProductListings.length !== 0 ||
                util.product?.upcomingProductListings.length !== 0) && (
                <S.FlexDiv>
                  <S.Text color="#9e9e9e" size="16px" fontWeight={500}>
                    Started at
                  </S.Text>
                  <S.Text color="white" size="16px" fontWeight={600}>
                    ${util.product?.activeProductListings[0]?.minBid}
                  </S.Text>
                  <S.Text color="#9e9e9e" size="16px" fontWeight={500}>
                    on{' '}
                    {util.product &&
                      formatDate(
                        new Date(
                          util.product?.activeProductListings[0]?.startDate
                        )
                      )}
                  </S.Text>
                </S.FlexDiv>
              )}
              <S.StyledPagination
                themeStyle={themeStyle}
                page={util.auctionPage}
                count={Math.ceil(totalBids / util.perPage)}
                onChange={handlers.handlePagination}
                siblingCount={matchesMobile ? 0 : 1}
                padding="32px 0 0 0"
              />
            </S.FlexColumn>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '30px',
              }}
            >
              <S.StyledPagination
                themeStyle={themeStyle}
                page={util.auctionPage}
                count={Math.ceil(totalBids / util.perPage)}
                onChange={handlers.handlePagination}
                siblingCount={matchesMobile ? 0 : 1}
              />

              {(util.product?.activeProductListings.length !== 0 ||
                util.product?.upcomingProductListings.length !== 0) && (
                <S.FlexDiv>
                  <S.Text color="#9e9e9e" size="16px" fontWeight={500}>
                    Started at
                  </S.Text>
                  <S.Text color="white" size="16px" fontWeight={600}>
                    ${util.product?.activeProductListings[0]?.minBid}
                  </S.Text>
                  <S.Text color="#9e9e9e" size="16px" fontWeight={500}>
                    on{' '}
                    {util.product &&
                      formatDate(
                        new Date(
                          util.product?.activeProductListings[0]?.startDate
                        )
                      )}
                  </S.Text>
                </S.FlexDiv>
              )}
            </div>
          ))}
      </S.TransactionHistory>
    </>
  );
};
