import React from 'react';
import { Collector } from 'entities/collector';
import CollectorRow from './collectorRow';
import { Link } from 'react-router-dom';
import * as S from './styles';

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
            key={index}
            to={'/product/' + collector._id}
            style={{ textDecoration: 'none' }}
          >
            {
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
            }
          </Link>
        ))}
    </S.Items>
  ) : (
    <S.NoOwners>No one owns this item yet</S.NoOwners>
  );
  return (
    <>
      {collectors?.map((collector) => {
        return body;
      })}
    </>
  );
};

export default CollectorList;
