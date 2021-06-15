import React, { useState, useCallback } from 'react';
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
const PER_PAGE = 5;
const CURRENT_PAGE = 1;

const CollectorList = ({ collectors, hasProducts, redeemable }: IProps) => {
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const [valueCurrentPage, setCurrentPage] = useState<number>(CURRENT_PAGE);
  const changePageCallback = useCallback(
    (ev, page) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

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
      <S.PaginationContainer>
        <S.CustomPagination
          count={Math.ceil(100 / PER_PAGE)}
          page={valueCurrentPage}
          onChange={changePageCallback}
          siblingCount={matchesMobile ? 0 : 1}
          style={{ color: 'white' }}
        />
      </S.PaginationContainer>
    </>
  );
};

export default CollectorList;
