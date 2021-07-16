import React, { useState, useEffect, useCallback } from 'react';
import { Sku } from 'entities/sku';
import { User } from 'entities/user';
import { Product } from 'entities/product';
import { Listing } from 'entities/listing';
import { getMeBids } from 'services/api/productService';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useAuth0 } from '@auth0/auth0-react';
import PageLoader from 'components/PageLoader';
import ActiveBids from './rowBid';
import Pagination from '@material-ui/lab/Pagination';
import * as S from './styles';

const PER_PAGE = 5;
const CURRENT_PAGE = 1;

interface MyBid {
  _id: string;
  bidAmt: number;
  createdAt: Date;
  updatedAt: Date;
  listing: MyListing;
  sku: Sku;
  owner: User;
}

type AuxHighestbid = Omit<MyBid, 'listing' | 'owner'>;
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
  sortBy: 'newest' | 'oldest';
}

const ListBids = ({ sortBy }: IProps) => {
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const [bids, setBids] = useState<{
    data: MyBid[];
    total: number;
  } | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const { getAccessTokenSilently } = useAuth0();
  const [valueCurrentPage, setCurrentPage] = useState<number>(CURRENT_PAGE);

  const changePageCallback = useCallback(
    (ev, page) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
  const fetchMeBids = async (page: number, sortBy: string) => {
    try {
      setLoading(true);
      const res = await getMeBids(
        await getAccessTokenSilently(),
        page,
        PER_PAGE,
        true,
        sortBy
      );
      if (res) {
        setBids({ data: res.data, total: res.totalBids });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeBids(valueCurrentPage, sortBy);
  }, [valueCurrentPage, sortBy]);

  if (loading || !bids) return <PageLoader size={15} />;

  if (!bids?.data.length)
    return (
      <S.NoResults>
        <p>No bids yet</p>
      </S.NoResults>
    );

  return (
    <S.GridContainer>
      <S.BidsGrid>
        {bids?.data?.map((activeBid) => {
          return (
            <ActiveBids
              key={activeBid?.listing?.product?._id}
              activeBid={activeBid}
              matchesMobile={matchesMobile}
            />
          );
        })}
      </S.BidsGrid>
      <S.PaginationContainer>
        <Pagination
          count={Math.ceil(bids.total / PER_PAGE)}
          page={valueCurrentPage}
          onChange={changePageCallback}
          siblingCount={matchesMobile ? 0 : 1}
        />
      </S.PaginationContainer>
    </S.GridContainer>
  );
};

export default ListBids;
