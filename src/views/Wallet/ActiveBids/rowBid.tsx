import React from 'react';
import { useHistory } from 'react-router-dom';
import * as S from './styles';
import moment from 'moment';
import 'moment-duration-format';
import { duration } from 'moment';
// import { Bid } from 'entities/bid';
import { Sku } from 'entities/sku';
import { User } from 'entities/user';
import { Product } from 'entities/product';
import { Listing } from 'entities/listing';
import redeemableIcon from 'assets/svg/icons/redeemable2.svg';
import redeemableIcon_disabled from 'assets/svg/icons/redeemable2_disabled.svg';
interface Bid {
  _id: string;
  bidAmt: number;
  createdAt: Date;
  updatedAt: Date;
  listing: MyListing;
  sku: Sku;
  owner: User;
}

type AuxHighestbid = Omit<Bid, 'listing' | 'owner'>;
interface Highestbid extends AuxHighestbid {
  listing: string;
  owner: string;
}

type AuxListing = Omit<Listing, 'product' | 'issuer'>;
interface MyListing extends AuxListing {
  product: Product;
  highestBid: Highestbid;
  issuer: User;
}

interface IProps {
  activeBid: Bid;
}

const activeColor = {
  red: '#FF0000',
  black: '#000000',
  grey: '#9e9e9e',
};

const ActiveBid = ({ activeBid }: IProps) => {
  const history = useHistory();

  const expiresIn = duration(
    moment(activeBid?.listing?.endDate).diff(moment())
  ) as any;

  const currentActiveBid = {
    id: activeBid?.listing?.product?._id,
    bidAmt: activeBid?.bidAmt,
    highestAmt: activeBid?.listing?.highestBid?.bidAmt,
    skuName: activeBid?.sku?.name,
    username: activeBid?.listing?.issuer?.username,
    redeemable: activeBid?.sku?.redeemable,
    redeemedStatus: activeBid?.listing?.product?.redeemedStatus,
    serialNumber: activeBid?.listing?.product?.serialNumber,
    expiresIn: expiresIn
      .format('Y[Y]# M[m]# w[w]#d[d]#h[h]#m[m]#s[s]', { trim: 'all' })
      .split('#')
      .slice(0, 2)
      .join('#')
      .replace(/#/g, ' '),
    bidType:
      activeBid?.bidAmt < activeBid?.listing?.highestBid?.bidAmt
        ? 'exceeded'
        : 'not-exceeded',
  };

  const handleRouteChange = () => {
    history.push(`/product/${currentActiveBid?.id}`);
  };

  return (
    <S.Container onClick={handleRouteChange}>
      <S.TransactionDetail>
        <S.Name
          style={{
            color: `${
              currentActiveBid.bidType === 'not-exceeded'
                ? activeColor.black
                : activeColor.red
            }`,
          }}
        >
          {currentActiveBid?.skuName} | #{currentActiveBid?.serialNumber}
          {'  '}
          {currentActiveBid?.redeemable && (
            <img
              src={
                currentActiveBid?.redeemedStatus === 'redeemed'
                  ? redeemableIcon_disabled
                  : redeemableIcon
              }
              alt="redeemable"
              width="10"
            />
          )}
        </S.Name>
        <S.TransactionDescription>
          {currentActiveBid?.username}
        </S.TransactionDescription>
      </S.TransactionDetail>
      <S.TransactionRow>
        <S.ContainerRow>
          <S.TranscriptionContainer>
            <S.TransactionDescription
              style={{
                color: activeColor.grey,
              }}
            >
              You bid{' '}
              {currentActiveBid.bidType === 'exceeded'
                ? `$${currentActiveBid?.bidAmt}`
                : ''}
            </S.TransactionDescription>
            <S.ArrowIcon style={{ fontSize: '12px', margin: '0 5px' }} />
            {currentActiveBid.bidType === 'exceeded' && (
              <>
                <S.TransactionDescription style={{ color: activeColor.red }}>
                  Bid exceeded
                </S.TransactionDescription>
                <S.ArrowIcon
                  style={{
                    fontSize: '12px',
                    margin: '0 5px',
                    color: activeColor.red,
                  }}
                />
              </>
            )}
            <span
              style={{
                fontSize: '16px',
                fontWeight: 400,
                color: `${
                  currentActiveBid.bidType === 'not-exceeded'
                    ? activeColor.black
                    : activeColor.red
                }`,
              }}
            >
              ${currentActiveBid?.highestAmt?.toFixed(2)}
            </span>
          </S.TranscriptionContainer>
          <S.TransactionDescription style={{ justifyContent: 'flex-end' }}>
            Expires in {currentActiveBid?.expiresIn}
          </S.TransactionDescription>
        </S.ContainerRow>
        <S.ArrowIcon
          style={{ marginLeft: '10px' }}
          onClick={handleRouteChange}
          className="redirect"
        />
      </S.TransactionRow>
    </S.Container>
  );
};

export default ActiveBid;
