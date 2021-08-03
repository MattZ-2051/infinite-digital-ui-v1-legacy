import React, { useState } from 'react';
import * as S from '../styles';
import * as Comps from '../components';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useOutsideAlert } from 'hooks/oustideAlerter';
import { formatDate } from 'utils/dates';

export const Header = ({
  product,
  isOwner,
  handlers,
  historyStatus,
  setIsRedeemModalOpen,
  setIsAuctionModalOpen,
  activeSalePrice,
  setIsCancelModalOpen,
  auctionStatus,
  setSelectedTab,
  util,
}) => {
  const { visible, setVisible, ref } = useOutsideAlert(false);
  const [showLink, setShowLink] = useState<boolean>(false);
  const selectedTab = handlers.selectedTab;
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const smallMobile = useMediaQuery('(max-width: 400px)');
  const bids = handlers.util.bids;
  const redeemable = product.sku.redeemable && product.redeemedStatus === 'NA';
  const handler = handlers;
  const isActiveAuctionNotOwner =
    historyStatus === 'active-auction' && !isOwner && matchesMobile;
  const selectedTabHistory = selectedTab === 'history';
  const selectedTabAuction = selectedTab === 'auction';
  const historyStatusIsUpcoming = historyStatus === 'upcoming';
  const historyStatusIsUpcomingAuction = historyStatus === 'upcoming-auction';
  const historyStatusIsOwner = historyStatus === 'owner';
  const historyStatusIsBuyNow = historyStatus === 'buy-now';
  const historyStatusIsCreateSale = historyStatus === 'create-sale';
  const historyStatusIsNotForSale = historyStatus === 'not-for-sale';
  const historyStatusIsActiveSale = historyStatus === 'active-sale';
  const historyStatusIsActiveAuction = historyStatus === 'active-auction';
  const auctionStatusIsUpcomingOwner =
    auctionStatus === 'upcoming-auction-owner';
  const auctionStatusIsActiveNoBidOwner =
    auctionStatus === 'active-auction-no-bid-owner';
  const isPastAuction = util.isPastAuction();

  return (
    <>
      <S.Header
        justifyContent={
          isActiveAuctionNotOwner && matchesMobile ? 'center' : ''
        }
      >
        <S.Row
          alignItems={
            isActiveAuctionNotOwner && matchesMobile
              ? 'center'
              : matchesMobile
              ? 'flex-start'
              : 'center'
          }
          flexDirection={matchesMobile ? 'column' : 'row'}
        >
          <S.ProductId>
            #{product?.serialNumber} {!matchesMobile && <S.Slash>/</S.Slash>}
          </S.ProductId>

          <S.ProductOwner
            padding={matchesMobile ? '10px 0 10px 0' : '0'}
            flexDirection="column"
            textAlign={isActiveAuctionNotOwner && matchesMobile ? 'center' : ''}
          >
            Owner
            <S.Owner onClick={handlers.handleRedirectToOwnerPage}>
              @{product?.owner.username}
            </S.Owner>
          </S.ProductOwner>
          {product.sku.redeemable && (
            <Comps.RedeemMessage
              matchesMobile={matchesMobile}
              isRedeemable={redeemable}
            />
          )}
        </S.Row>

        {historyStatusIsUpcoming && selectedTabHistory && (
          <Comps.UpcomingHistoryButton
            setShowLink={setShowLink}
            showLink={showLink}
          />
        )}

        {historyStatusIsOwner && selectedTabHistory && (
          <Comps.OwnerHistoryActions
            setVisible={setVisible}
            visible={visible}
            product={product}
            setIsRedeemModalOpen={setIsRedeemModalOpen}
            setIsAuctionModalOpen={setIsAuctionModalOpen}
            handlers={handler}
            ref={ref}
          />
        )}

        {historyStatusIsBuyNow && selectedTabHistory && (
          <S.ButtonContainer>
            <S.Button
              onClick={handlers.handleSaleAction}
              hover={true}
              width="190px"
              height="40px"
              fontSize="16px"
            >
              Buy Now for ${product?.activeProductListings[0]?.price}
            </S.Button>
          </S.ButtonContainer>
        )}
        {historyStatusIsCreateSale && selectedTabHistory && (
          <S.ButtonContainer>
            <S.Button
              onClick={handlers.handleSaleAction}
              width="130px"
              hover={true}
              height="40px"
              fontSize="16px"
            >
              List for sale
            </S.Button>
          </S.ButtonContainer>
        )}

        {historyStatusIsActiveSale &&
          selectedTabHistory &&
          product?.activeProductListings[0].saleType !== 'auction' &&
          matchesMobile && (
            <S.ButtonContainer flexDirection="column">
              {' '}
              <S.FlexColumn padding="0">
                <S.ActiveAmount>${activeSalePrice}</S.ActiveAmount>
                <div style={{ display: 'flex' }}>
                  <S.StatusText>Status:</S.StatusText>
                  {/* ToDo: This status is hardcoded */}
                  <S.ActiveText>active</S.ActiveText>
                </div>
              </S.FlexColumn>{' '}
              <S.Button
                width="130px"
                onClick={() => setIsCancelModalOpen(true)}
                hover={true}
                height="40px"
                fontSize="16px"
              >
                Cancel Sale
              </S.Button>
            </S.ButtonContainer>
          )}

        {historyStatusIsActiveSale &&
          selectedTabHistory &&
          product?.activeProductListings[0].saleType !== 'auction' &&
          !matchesMobile && (
            <S.ButtonContainer flexDirection="row">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <S.FlexColumn padding={'0 16px 0 0'}>
                  <S.ActiveAmount>${activeSalePrice}</S.ActiveAmount>
                  <div style={{ display: 'flex' }}>
                    <S.StatusText>Status:</S.StatusText>
                    {/* ToDo: This status is hardcoded */}
                    <S.ActiveText>active</S.ActiveText>
                  </div>
                </S.FlexColumn>
                <S.Button
                  width="130px"
                  onClick={() => setIsCancelModalOpen(true)}
                  hover={true}
                  height="40px"
                  fontSize="16px"
                >
                  Cancel Sale
                </S.Button>
              </div>
            </S.ButtonContainer>
          )}
        {historyStatusIsUpcomingAuction && selectedTabHistory && product && (
          <S.FlexColumn padding={matchesMobile ? '0' : '0 80px 0 0'}>
            <S.Text
              color="white"
              size="24px"
              fontWeight={600}
              textAlign={matchesMobile ? 'end' : ''}
              width={smallMobile ? '120px' : ''}
              padding="0 5px"
            >
              Upcoming Auction
            </S.Text>
            <S.Text
              size="14px"
              color="#999999"
              fontWeight={500}
              textAlign={smallMobile ? 'center' : ''}
              width={smallMobile ? '108px' : ''}
              padding="0 5px"
            >
              (Starts{' '}
              {formatDate(product?.upcomingProductListings[0]?.startDate)})
            </S.Text>
          </S.FlexColumn>
        )}
        {(auctionStatusIsUpcomingOwner || auctionStatusIsActiveNoBidOwner) &&
          selectedTabAuction && (
            <S.ButtonContainer>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <S.Button
                  width="160px"
                  hover={true}
                  onClick={() => setIsCancelModalOpen(true)}
                  height="40px"
                  fontSize="16px"
                >
                  Cancel Auction
                </S.Button>
              </div>
            </S.ButtonContainer>
          )}
        {historyStatusIsActiveAuction &&
          !isOwner &&
          selectedTabHistory &&
          !matchesMobile && (
            <S.ButtonContainer>
              <S.Button
                hover={true}
                width="160px"
                height="56px"
                fontSize="20px"
                onClick={() => setSelectedTab('auction')}
              >
                Bid Now
              </S.Button>
            </S.ButtonContainer>
          )}

        {historyStatusIsActiveAuction && selectedTabHistory && isOwner && (
          <S.ButtonContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                flexDirection: 'column',
              }}
            >
              <S.BidAmount>
                ${bids[0]?.bidAmt || product?.activeProductListings[0]?.minBid}
              </S.BidAmount>
              <S.Text color="#7c7c7c" size="16px" fontWeight={500} padding="0">
                {bids.length === 0 ? 'Minimum Bid' : 'Current Bid'}
              </S.Text>
            </div>
          </S.ButtonContainer>
        )}
      </S.Header>
      {historyStatusIsActiveAuction &&
        !isOwner &&
        selectedTabHistory &&
        matchesMobile && (
          <S.ButtonContainer>
            <S.Button
              hover={true}
              width="160px"
              height="56px"
              fontSize="20px"
              onClick={() => setSelectedTab('auction')}
            >
              Bid Now
            </S.Button>
          </S.ButtonContainer>
        )}
    </>
  );
};
