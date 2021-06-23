import React, { useState, useEffect, useCallback } from 'react';
import { getProductCollectors } from 'services/api/productService';
import { Collector } from 'entities/collector';
import { useParams } from 'react-router-dom';
import { Sku } from 'entities/sku';
import { getSku } from 'services/api/sku';
import PageLoader from 'components/PageLoader';
import * as S from './styles';
import ProductDetails from '../../Product/ProductDetails';
import SearchBar from 'components/SearchBar';
import { cancelablePromise } from 'utils/cancelablePromise';
import CollectorList from './collectorList';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const PER_PAGE = 5;
const CURRENT_PAGE = 1;

const Collectors = () => {
  const [collectors, setCollectors] = useState<{
    data: Collector[];
    total: number;
  } | null>(null);
  const { skuid } = useParams<{ skuid: string }>();
  const [sku, setSku] = useState<Sku>();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [forSaleCheck, setForSaleCheck] = useState<boolean>(false);
  const [sortBySerialAsc, setSortBySerialAsc] = useState<boolean>(true);
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const [valueCurrentPage, setCurrentPage] = useState<number>(CURRENT_PAGE);

  const changePageCallback = useCallback(
    (ev, page) => {
      setCurrentPage(page);
    },
    [setCurrentPage]
  );

  useEffect(() => {
    fetchSku();
  }, [skuid]);

  async function fetchCollectors() {
    try {
      return await getProductCollectors(
        skuid,
        valueCurrentPage,
        PER_PAGE,
        true,
        searchTerm,
        forSaleCheck,
        sortBySerialAsc
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchSku() {
    const sku = await getSku<true>(skuid, {
      includeFunctions: true,
    });
    setSku(sku);
  }

  useEffect(() => {
    const cPr = cancelablePromise(fetchCollectors());
    cPr.promise.then((resp) => {
      setCollectors(resp as { data: Collector[]; total: number });
    });
    return () => {
      cPr && cPr.cancel();
    };
  }, [skuid, searchTerm, forSaleCheck, valueCurrentPage, sortBySerialAsc]);

  if (!sku) return <PageLoader />;

  return (
    <S.MainContent>
      <ProductDetails
        sku={sku}
        totalSupply={sku.totalSupply || 0}
        circulatingSupply={sku?.circulatingSupply || 0}
        redeemable={sku?.redeemable}
      />
      <S.Container>
        <S.Title>
          <div>
            <S.TitleLink to="/marketplace?page=1&per_page=6&sortBy=startDate:asc">
              Marketplace
            </S.TitleLink>{' '}
            /{' '}
            <S.TitleLink to={`/marketplace/${sku?._id}`}>
              {sku?.name}
            </S.TitleLink>{' '}
            / Collectors
          </div>
        </S.Title>
        <S.SectionTitle>Collectors</S.SectionTitle>
        <SearchBar
          onSearch={setSearchTerm}
          onChecked={setForSaleCheck}
          onSort={setSortBySerialAsc}
          sortAsc={sortBySerialAsc}
          placeholder={'Select a product to view more details'}
        />

        {collectors && (
          <S.ContentListPagination>
            <CollectorList
              hasProducts={collectors.data.length !== 0}
              collectors={collectors.data}
              redeemable={sku?.redeemable}
            />
            <S.PaginationContainer>
              <S.CustomPagination
                count={Math.ceil(collectors?.total / PER_PAGE)}
                page={valueCurrentPage}
                onChange={changePageCallback}
                siblingCount={matchesMobile ? 0 : 1}
                style={{ color: 'white' }}
              />
            </S.PaginationContainer>
          </S.ContentListPagination>
        )}
      </S.Container>
    </S.MainContent>
  );
};

export default Collectors;
