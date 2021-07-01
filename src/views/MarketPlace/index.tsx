import { useHistory } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Pagination from '@material-ui/lab/Pagination';
import { useUpdateEffect } from 'react-use';
// Local
import { getSkuTilesThunk } from 'store/sku/skuThunks';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Filters from './components/Filters';
import {
  processUrlParams,
  updateFilter,
  updatePagination,
  updateSortBy,
  setMarketplaceState,
} from 'store/marketplace/marketplaceSlice';
import * as S from './styles';
import { SkuWithTotal } from 'entities/sku';
// import { sortByItems } from 'config/marketplace';
// Components
import SearchInput from './components/Filters/SearchInput';
// import SortByFilter from './components/Filters/SortByFilter';
import SkuTile from './components/SkuTile';
import PageLoader from 'components/PageLoader';
// Icons
import { ReactComponent as FilterIcon } from 'assets/svg/icons/filters.svg';
import { ReactComponent as CloseIcon } from 'assets/svg/icons/close.svg';

const MarketPlace = (): JSX.Element => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState(2000);
  const activeFilters = useAppSelector((store) => store.marketplace.filters);
  const activePagination = useAppSelector(
    (store) => store.marketplace.pagination
  );
  const activeSort = useAppSelector((store) => store.marketplace.sortBy);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const skus = useAppSelector((state) => state.sku.skus) as SkuWithTotal;
  const urlQueryString = window.location.search;
  const regenerateUrl = useRef(true);
  const isMounted = useRef(true);
  // Create the url query-string using the redux stored data: filters, sort, pagination
  const createQueryString = (
    filters,
    pagination: { page: string; perPage: string },
    sort: string
  ) => {
    const params = new URLSearchParams();
    // Filters
    Object.keys(filters).forEach((categoryName) => {
      const categoryValue = filters[categoryName];
      if (categoryValue && categoryValue.length) {
        if (categoryValue instanceof Array) {
          switch (categoryName) {
            case 'date':
              params.append('startDate', categoryValue[0]);
              params.append('endDate', categoryValue[1]);
              break;
            case 'price':
              params.append('minPrice', categoryValue[0]);
              params.append('maxPrice', categoryValue[1]);
              break;
            case 'creator':
              params.append('issuerId', categoryValue.join(','));
              break;
            default:
              params.append(categoryName, categoryValue.join(','));
              break;
          }
        } else {
          params.append(categoryName, categoryValue);
        }
      }
    });

    // Pagination
    if (pagination) {
      params.append('page', pagination.page);
      params.append('per_page', pagination.perPage);
    }

    // SearchBy
    if (sort) {
      params.append('sortBy', sort);
    }
    return params;
  };

  const handleFilter = (name: string, value: any) => {
    const payload = {
      filterName: name,
      filterValue: value,
    };
    dispatch(updateFilter(payload));
    setPage(1);
    const cloneFilters = { ...activeFilters };
    cloneFilters[name] = value;
    const queryString = createQueryString(
      cloneFilters,
      { page: '1', perPage: '6' },
      activeSort
    );
    if (regenerateUrl.current) {
      history.push(`/marketplace?${queryString.toString()}`);
      fetchData(dispatch, `?${queryString.toString()}`);
    } else {
      regenerateUrl.current = true;
      fetchData(dispatch, `?${queryString.toString()}`);
    }
  };

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    dispatch(updatePagination({ page: String(value), perPage: '6' }));
    const pagination = { page: String(value), perPage: '6' };
    const queryString = createQueryString(
      activeFilters,
      pagination,
      activeSort
    );
    if (regenerateUrl.current) {
      history.push(`/marketplace?${queryString.toString()}`);
      fetchData(dispatch, `?${queryString.toString()}`);
    } else {
      regenerateUrl.current = true;
      fetchData(dispatch, `?${queryString.toString()}`);
    }
  };

  const handleSort = (sortValue: string) => {
    dispatch(updateSortBy(sortValue));
  };

  const toggleFilters = () => {
    setFiltersVisible((filtersVisible) => !filtersVisible);
  };

  const fetchData = (fn, queryParams?) => {
    setLoading(true);
    return fn(
      getSkuTilesThunk({
        queryParams: queryParams || `${urlQueryString.toString()}`,
      })
    ).then(
      (response) => {
        setLoading(false);
        if (response.type === 'skus/get/fulfilled') {
          setMaxPrice(response.payload.maxSkusMinPrice);
        }
      },
      () => setLoading(false)
    );
  };

  // Load initial data on mount
  useEffect(() => {
    fetchData(dispatch, `${urlQueryString.toString()}`);
    const page = new URLSearchParams(urlQueryString).get('page');
    setPage(Number(page));
  }, [dispatch]);

  // Request new data on filters change
  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
    } else {
      // Avoid regenerating the url if the user press the browser back button
      // const queryString = createQueryString(
      //   activeFilters,
      //   activePagination,
      //   activeSort
      // );
      // if (regenerateUrl.current) {
      //   history.push(`/marketplace?${queryString.toString()}`);
      //   fetchData(dispatch, `?${queryString.toString()}`);
      // } else {
      //   regenerateUrl.current = true;
      //   fetchData(dispatch, `?${queryString.toString()}`);
      // }
    }
  }, [activeFilters, activePagination, activeSort]);

  useUpdateEffect(() => {
    setPage(1);
  }, [activeFilters]);

  // Update the filters on browser back btn
  useEffect(() => {
    return history.listen(() => {
      if (history.action === 'POP') {
        regenerateUrl.current = false;
        const urlParams = processUrlParams();
        dispatch(
          setMarketplaceState({
            filters: urlParams.filters,
            pagination: urlParams.pagination,
            sortBy: urlParams.sortBy,
          })
        );
        setPage(Number(urlParams.pagination.page));
      }
    });
  }, [history]);

  if (!skus) return <PageLoader />;
  return (
    <S.Container>
      <S.Header>
        <h2>Marketplace</h2>

        <SearchInput
          handleFilter={handleFilter}
          activeFilters={activeFilters}
        />

        <S.ToggleFilter onClick={toggleFilters}>
          {filtersVisible ? <CloseIcon /> : <FilterIcon />}
        </S.ToggleFilter>

        {/* <SortByFilter
          handleSort={handleSort}
          activeSort={activeSort}
          options={sortByItems}
        /> */}
      </S.Header>

      {filtersVisible && matchesMobile && (
        <Filters
          handleFilter={handleFilter}
          activeFilters={activeFilters}
          maxPrice={maxPrice}
          loading={loading}
        />
      )}

      <S.Main>
        <S.Sidebar>
          <Filters
            handleFilter={handleFilter}
            activeFilters={activeFilters}
            maxPrice={maxPrice}
            skuTotal={skus?.total}
            loading={loading}
          />
        </S.Sidebar>
        <S.Content>
          {/* Sku Tile data from store being rendered with Sku Tiles */}
          {skus.data instanceof Array && skus.data.length ? (
            <>
              <S.ProductsGrid>
                {skus.data.map((sku) => {
                  return <SkuTile themeStyle="light" sku={sku} key={sku._id} />;
                })}
              </S.ProductsGrid>

              <S.PaginationContainer>
                <Pagination
                  count={Math.ceil(skus.total / 6)}
                  page={page}
                  onChange={handlePagination}
                  siblingCount={matchesMobile ? 0 : 1}
                />
              </S.PaginationContainer>
            </>
          ) : (
            <S.NoResults>
              <h4>No matches found</h4>
              <p>Please try another search.</p>
            </S.NoResults>
          )}
        </S.Content>
      </S.Main>
    </S.Container>
  );
};

export default MarketPlace;
