import React from 'react';
import { Listing } from 'entities/listing';
import * as S from './styles';
import { formatCountdown } from 'utils/dates';
import usePriceFormatter from 'hooks/usePriceFormatter';
import redeemableIcon from 'assets/svg/icons/redeemable-white-background.svg';
import redeemableIcon_disabled from 'assets/svg/icons/redeemable-gray-background.svg';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

export interface ItemProps {
  serialNumber: string;
  ownerName: string;
  highestBid?: number;
  endDate?: Date;
  activeProductListing?: Listing;
  upcomingProductListing?: Listing;
  redeemable: boolean;
  redeemedStatus: string;
}

const CollectorRow = ({
  serialNumber,
  ownerName,
  highestBid,
  endDate,
  activeProductListing,
  upcomingProductListing,
  redeemable,
  redeemedStatus,
}: ItemProps) => {
  const auctionDetailMsg =
    !activeProductListing && !upcomingProductListing
      ? 'Not for sale'
      : upcomingProductListing
      ? 'Upcoming'
      : activeProductListing?.saleType === 'auction'
      ? 'Bid for'
      : 'On sale for';

  const formattedPrice = usePriceFormatter(activeProductListing?.price);
  const formattedBid = usePriceFormatter(activeProductListing?.minBid);

  const LightTooltip = withStyles((theme) => ({
    arrow: {
      color: theme.palette.common.white,
    },
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: '#000000',
      boxShadow: theme.shadows[1],
      lineHeight: '18px',
      fontSize: 14,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 999,
    },
  }))(Tooltip);

  return (
    <S.MainContainerRow>
      <S.TransactionDetail>
        <S.Name>
          #{serialNumber}
          &nbsp;
          {redeemable &&
            (redeemedStatus === 'redeemed' ? (
              <img src={redeemableIcon_disabled} alt="redeemable" width="25" />
            ) : (
              <LightTooltip arrow title="Redeemeable" placement="top">
                <img src={redeemableIcon} alt="redeemable" width="25" />
              </LightTooltip>
            ))}
        </S.Name>
        <S.TransactionDescription>{ownerName}</S.TransactionDescription>
      </S.TransactionDetail>
      <S.TransactionRow>
        <S.ContainerRow>
          <S.TranscriptionContainer>
            <S.TransactionDescription
              style={{
                color: 'grey',
              }}
            >
              {auctionDetailMsg}
            </S.TransactionDescription>
            {auctionDetailMsg !== 'Not for sale' ? (
              <S.ArrowIcon style={{ fontSize: '12px', margin: '0 5px' }} />
            ) : null}
            {activeProductListing &&
              activeProductListing?.saleType !== 'auction' && (
                <>
                  <span style={{ color: 'white' }}>{`$${formattedPrice}`}</span>{' '}
                </>
              )}
            {activeProductListing &&
              activeProductListing?.saleType === 'auction' && (
                <>
                  <span style={{ color: 'white' }}>{`$${formattedBid}`}</span>{' '}
                </>
              )}
          </S.TranscriptionContainer>
          <S.TransactionDescription style={{ justifyContent: 'flex-end' }}>
            {endDate ? (
              <span>
                Expires in {endDate && formatCountdown(new Date(endDate))}
              </span>
            ) : null}
          </S.TransactionDescription>
        </S.ContainerRow>
        <S.ArrowIcon style={{ marginLeft: '10px' }} className="redirect" />
      </S.TransactionRow>
    </S.MainContainerRow>
  );
};

export default CollectorRow;
