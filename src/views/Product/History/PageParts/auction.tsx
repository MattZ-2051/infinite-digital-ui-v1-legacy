import * as S from '../styles';
import Transaction from '../Transaction';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BidIcon from 'assets/img/icons/bid-dollar-icon.png';
import { formatDate } from 'utils/dates';

const GreyTextProps = {
  color: '#9e9e9e',
  size: '16px',
};

export const Auction = ({
  util,
  handlers,
  auctionStatus,
  themeStyle,
  totalBids,
}) => {
  const matchesMobile = useMediaQuery('(max-width:1140px)');

  return (
    <>
      <S.TransactionHistory>
        {util.product?.upcomingProductListings.length !== 0 ? (
          <S.BidsContainer padding={'22px 0px'}>
            <S.Text color="white" size="18px" fontWeight={600} padding="0 5px">
              Starts at ${util.product?.upcomingProductListings[0].minBid} in{' '}
              {util.countDown()}{' '}
            </S.Text>
            <S.Text
              color="#7c7c7c"
              size="14px"
              fontWeight={400}
              padding="0 5px"
            >
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
            {matchesMobile ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  paddingTop: '32px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <S.Text {...GreyTextProps} fontWeight={600} padding="0 5px">
                    Started at
                  </S.Text>
                  <S.Text {...GreyTextProps} fontWeight={600} padding="0 5px">
                    ${util.product?.activeProductListings[0].minBid}
                  </S.Text>{' '}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <S.Text {...GreyTextProps} fontWeight={500} padding="0 5px">
                    on
                  </S.Text>
                  <S.Text {...GreyTextProps} fontWeight={500} padding="0 5px">
                    {util.product?.activeProductListings[0].length !== 0 &&
                      `${formatDate(
                        new Date(
                          util.product?.activeProductListings[0].startDate
                        )
                      )}`}
                  </S.Text>
                </div>
              </div>
            ) : (
              <S.TextContainer paddingTop="32px">
                <S.Text {...GreyTextProps} fontWeight={600} padding="0 5px">
                  Started at
                </S.Text>
                <S.Text
                  color="white"
                  size="16px"
                  fontWeight={600}
                  padding="0 5px"
                >
                  ${util.product?.activeProductListings[0].minBid}
                </S.Text>{' '}
                <S.Text {...GreyTextProps} fontWeight={500} padding="0 5px">
                  on
                </S.Text>
                <S.Text {...GreyTextProps} fontWeight={500} padding="0 5px">
                  {util.product?.activeProductListings[0].length !== 0 &&
                    `${formatDate(
                      new Date(util.product?.activeProductListings[0].startDate)
                    )}`}
                </S.Text>
              </S.TextContainer>
            )}
          </>
        ) : auctionStatus === 'active-auction-bid-owner' ||
          auctionStatus === 'processing-auction' ? (
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
              {!util?.bids ||
              util?.bids?.length === 0 ||
              !(util.bids instanceof Array) ? (
                <>No Transactions</>
              ) : (
                util.bids.map((bid) => {
                  return <Transaction key={bid._id} bid={bid} />;
                })
              )}
            </S.BidsHistory>
          )
        )}
        {auctionStatus.split('-')[0] !== 'upcoming' &&
          auctionStatus !== 'active-auction-no-bid-owner' &&
          auctionStatus !== 'active-auction-no-bid-user' &&
          (matchesMobile ? (
            <S.FlexColumn alignItems="center" padding="32px 0 0 0">
              {util.product?.activeProductListings.length !== 0 &&
                (!matchesMobile ? (
                  <S.FlexDiv>
                    <S.Text
                      color="#9e9e9e"
                      size="16px"
                      fontWeight={500}
                      padding="0 5px"
                    >
                      Started at
                    </S.Text>
                    <S.Text
                      color="white"
                      size="16px"
                      fontWeight={600}
                      padding="0 5px"
                    >
                      ${util.product?.activeProductListings[0]?.minBid}
                    </S.Text>
                    <S.Text
                      color="#9e9e9e"
                      size="16px"
                      fontWeight={500}
                      padding="0 5px"
                    >
                      on{' '}
                      {util.product &&
                        formatDate(
                          new Date(
                            util.product?.activeProductListings[0]?.startDate
                          )
                        )}
                    </S.Text>
                  </S.FlexDiv>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <S.Text
                        color="#9e9e9e"
                        size="16px"
                        fontWeight={500}
                        padding="0 5px"
                      >
                        Started at
                      </S.Text>
                      <S.Text
                        color="white"
                        size="16px"
                        fontWeight={600}
                        padding="0 5px"
                      >
                        ${util.product?.activeProductListings[0]?.minBid}
                      </S.Text>
                    </div>
                    <S.Text
                      color="#9e9e9e"
                      size="16px"
                      fontWeight={500}
                      padding="0 5px"
                    >
                      on{' '}
                      {util.product &&
                        formatDate(
                          new Date(
                            util.product?.activeProductListings[0]?.startDate
                          )
                        )}
                    </S.Text>
                  </div>
                ))}
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
                paddingTop: '32px',
              }}
            >
              <S.StyledPagination
                themeStyle={themeStyle}
                page={util.auctionPage}
                count={Math.ceil(totalBids / util.perPage)}
                onChange={handlers.handlePagination}
                siblingCount={matchesMobile ? 0 : 1}
                padding="0px"
              />
              {util.product?.activeProductListings.length !== 0 &&
                (!matchesMobile ? (
                  <S.FlexDiv>
                    <S.Text
                      color="#9e9e9e"
                      size="16px"
                      fontWeight={500}
                      padding="0 5px"
                    >
                      Started at
                    </S.Text>
                    <S.Text
                      color="white"
                      size="16px"
                      fontWeight={600}
                      padding="0 5px"
                    >
                      ${util.product?.activeProductListings[0]?.minBid}
                    </S.Text>
                    <S.Text
                      color="#9e9e9e"
                      size="16px"
                      fontWeight={500}
                      padding="0 5px"
                    >
                      on{' '}
                      {util.product &&
                        formatDate(
                          new Date(
                            util.product?.activeProductListings[0]?.startDate
                          )
                        )}
                    </S.Text>
                  </S.FlexDiv>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div>
                      <S.Text
                        color="#9e9e9e"
                        size="16px"
                        fontWeight={500}
                        padding="0 5px"
                      >
                        Started at
                      </S.Text>
                      <S.Text
                        color="white"
                        size="16px"
                        fontWeight={600}
                        padding="0 5px"
                      >
                        ${util.product?.activeProductListings[0]?.minBid}
                      </S.Text>
                    </div>
                    <S.Text
                      color="#9e9e9e"
                      size="16px"
                      fontWeight={500}
                      padding="0 5px"
                    >
                      on{' '}
                      {util.product &&
                        formatDate(
                          new Date(
                            util.product?.activeProductListings[0]?.startDate
                          )
                        )}
                    </S.Text>
                  </div>
                ))}
            </div>
          ))}
      </S.TransactionHistory>
    </>
  );
};
