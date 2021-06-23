import React from 'react';
import { Collector } from 'entities/collector';
import CollectorRow from './collectorRow';
import { Link } from 'react-router-dom';
import * as S from './styles';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface IProps {
  redeemable: boolean;
  collectors: Collector[];
  hasProducts: boolean;
}
const CollectorList = ({ collectors, hasProducts, redeemable }: IProps) => {
  const body = hasProducts ? (
    <S.Items>
      {collectors &&
        collectors.map((collector, index) => (
          <Link
            key={collector._id}
            to={'/product/' + collector._id}
            style={{ textDecoration: 'none' }}
          >
            <S.BorderTop />
            <CollectorRow
              activeProductListing={collector.activeProductListing}
              key={collector.serialNumber}
              serialNumber={collector.serialNumber}
              ownerName={collector.owner.username}
              highestBid={collector.activeProductListing?.price}
              endDate={collector.activeProductListing?.endDate}
              upcomingProductListing={collector.upcomingProductListing}
              redeemable={redeemable}
              redeemedStatus={collector.redeemedStatus}
            />
          </Link>
        ))}
    </S.Items>
  ) : (
    <S.NoOwners>No collector editions for sale</S.NoOwners>
  );
  return <>{body}</>;
};

export default CollectorList;
