import { useState } from 'react';
import * as S from '../styles';
import * as Comps from '../components';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useOutsideAlert } from 'hooks/oustideAlerter';

export const Header = ({
  product,
  handlers,
  historyStatus,
  setIsRedeemModalOpen,
  setIsAuctionModalOpen,
  activeSalePrice,
  setIsCancelModalOpen,
  auctionStatus,
}) => {
  const { visible, setVisible, ref } = useOutsideAlert(false);
  const [showLink, setShowLink] = useState<boolean>(false);
  const selectedTab = handlers.selectedTab;
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const bids = handlers.util.bids;
  const redeemable = product.sku.redeemable && product.redeemedStatus === 'NA';
  const handler = handlers;
  return (
    <S.Header>
      <S.Row
        alignItems={matchesMobile ? 'flex-start' : 'center'}
        flexDirection={matchesMobile ? 'column' : 'row'}
      >
        <S.ProductId>
          #{product?.serialNumber} {!matchesMobile && <S.Slash>/</S.Slash>}
        </S.ProductId>

        <S.ProductOwner
          padding={matchesMobile ? '10px 0 10px 0' : '0'}
          flexDirection="column"
        >
          Owner
          <S.Owner onClick={handlers.handleRedirectToOwnerPage}>
            @{product?.owner.username}
          </S.Owner>
        </S.ProductOwner>
        <Comps.RedeemMessage
          matchesMobile={matchesMobile}
          isRedeemable={redeemable}
        />
      </S.Row>

      {historyStatus === 'upcoming' && selectedTab === 'history' && (
        <Comps.UpcomingHistoryButton
          setShowLink={setShowLink}
          showLink={showLink}
        />
      )}

      {historyStatus === 'owner' && selectedTab === 'history' && (
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

      {historyStatus === 'buy-now' && selectedTab === 'history' && (
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
      {historyStatus === 'create-sale' && selectedTab === 'history' && (
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

      {historyStatus === 'not-for-sale' && selectedTab === 'history' && (
        <S.ButtonContainer>
          <S.Button
            onClick={handlers.handleSaleAction}
            className="button_noSale"
            width="130px"
            hover={false}
            height="40px"
            fontSize="16px"
          >
            Not for sale
          </S.Button>
        </S.ButtonContainer>
      )}

      {historyStatus === 'active-sale' &&
        selectedTab === 'history' &&
        product?.activeProductListings[0].saleType !== 'auction' &&
        matchesMobile && (
          <S.ButtonContainer flexDirection="column">
            {' '}
            <S.FlexColumn padding="0">
              <S.ActiveAmount>${activeSalePrice}</S.ActiveAmount>
              <div style={{ display: 'flex' }}>
                <S.StatusText>Status:</S.StatusText>
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

      {historyStatus === 'active-sale' &&
        selectedTab === 'history' &&
        product?.activeProductListings[0].saleType !== 'auction' &&
        !matchesMobile && (
          <S.ButtonContainer flexDirection="row">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <S.FlexColumn padding={'0 16px 0 0'}>
                <S.ActiveAmount>${activeSalePrice}</S.ActiveAmount>
                <div style={{ display: 'flex' }}>
                  <S.StatusText>Status:</S.StatusText>
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

      {(auctionStatus === 'upcoming-auction' ||
        auctionStatus === 'active-auction-no-bid-owner') &&
        selectedTab === 'auction' && (
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

      {(auctionStatus === 'upcoming-auction' ||
        auctionStatus === 'active-auction-bid-owner') &&
        selectedTab === 'auction' && (
          <S.ButtonContainer>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                flexDirection: 'column',
              }}
            >
              <S.BidAmount>${bids[0].bidAmt}</S.BidAmount>
              <S.Text
                color="#7c7c7c"
                size="16px"
                fontWeight={500}
                style={{ padding: '0' }}
              >
                Current Bid
              </S.Text>
            </div>
          </S.ButtonContainer>
        )}
    </S.Header>
  );
};
