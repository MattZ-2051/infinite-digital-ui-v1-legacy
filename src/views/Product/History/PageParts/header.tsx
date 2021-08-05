import React, { useState } from 'react';
import * as S from '../styles';
import * as Comps from '../components';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useOutsideAlert } from 'hooks/oustideAlerter';

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
  const redeemable = product.sku.redeemable && product.redeemedStatus === 'NA';
  const handler = handlers;
  const isActiveAuctionNotOwner =
    historyStatus === 'active-auction' && !isOwner && matchesMobile;
  const selectedTabHistory = selectedTab === 'history';
  const historyStatusIsUpcoming = historyStatus === 'upcoming';
  const historyStatusIsOwner = historyStatus === 'owner';

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
      </S.Header>
    </>
  );
};
