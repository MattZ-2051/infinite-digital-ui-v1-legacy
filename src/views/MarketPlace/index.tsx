import { useHistory } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Pagination from '@material-ui/lab/Pagination';
import {
  getUserInfoThunk,
  getUserCardsThunk,
} from 'store/session/sessionThunks';
import { useUpdateEffect } from 'react-use';
// Local
import { getSkuTilesThunk } from 'store/sku/skuThunks';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Filters from './components/Filters';
import {
  processUrlParams,
  updateFilter,
  updatePagination,
  setMarketplaceState,
  restoreFilters,
} from 'store/marketplace/marketplaceSlice';
import * as S from './styles';
import { SkuWithTotal } from 'entities/sku';
// Components
import SearchInput from './components/Filters/SearchInput';
import SkuTile from './components/SkuTile';
import PageLoader from 'components/PageLoader';
// Icons
import { ReactComponent as FilterIcon } from 'assets/svg/icons/filters.svg';
import { ReactComponent as CloseIcon } from 'assets/svg/icons/close.svg';
import { getSkuTiles } from 'services/api/sku';
import { useAuth0 } from '@auth0/auth0-react';

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

  // // SearchBy
  // if (sort) {
  //   params.append('sortBy', sort);
  // }
  return params;
};

const MarketPlace = (): JSX.Element => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [page, setPage] = useState(1);
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
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
    } else {
      regenerateUrl.current = true;
    }
    fetchData(dispatch, `?${queryString.toString()}`);
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
    } else {
      regenerateUrl.current = true;
    }
    fetchData(dispatch, `?${queryString.toString()}`);
  };

  const toggleFilters = () => {
    setFiltersVisible((filtersVisible) => !filtersVisible);
  };

  const clearFilters = () => {
    dispatch(restoreFilters());
    // const cloneFilters = { ...activeFilters };
    // cloneFilters[name] = value;
    const queryString = createQueryString(
      [],
      { page: '1', perPage: '6' },
      activeSort
    );
    if (regenerateUrl.current) {
      history.push(`/marketplace?${queryString.toString()}`);
    } else {
      regenerateUrl.current = true;
    }
    fetchData(dispatch, `?${queryString.toString()}`);
    setPage(1);
    // handleFilter(filterCategory, activeFilters);
  };

  const fetchData = (fn, queryParams?) => {
    setLoading(true);
    return fn(
      getSkuTilesThunk({
        queryParams: queryParams || `${urlQueryString.toString()}`,
      })
    )
      .catch()
      .then(() => setLoading(false));
  };

  // Load initial data on mount
  useEffect(() => {
    if (!urlQueryString.toString()) {
      const pagination = {
        page: activePagination.page,
        perPage: activePagination.perPage,
      };
      const queryString = createQueryString(
        activeFilters,
        pagination,
        activeSort
      );
      setPage(Number(activePagination.page));
      history.replace(`?${queryString.toString()}`);
      fetchData(dispatch, `?${queryString.toString()}`);
    } else {
      const page = new URLSearchParams(urlQueryString).get('page');
      setPage(Number(page));
      fetchData(dispatch, `${urlQueryString.toString()}`);
    }
    // Update the filters on browser back btn
    history.listen(() => {
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
        const queryString = createQueryString(
          urlParams.filters,
          { page: urlParams.pagination.page, perPage: '6' },
          urlParams.sortBy
        );
        fetchData(dispatch, `?${queryString.toString()}`);
      }
    });
  }, [history, dispatch]);

  useEffect(() => {
    setLoading(true);
    getSkuTiles({})
      .then(({ maxSkusMinPrice }) => {
        maxSkusMinPrice && setMaxPrice(maxSkusMinPrice);
      })
      .catch()
      .then(() => setLoading(false));
  }, []);

  // Request new data on filters change
  useUpdateEffect(() => {
    setPage(1);
  }, [activeFilters]);

  useEffect(() => {
    if (isAuthenticated) {
      (async function () {
        const userToken = await getAccessTokenSilently();
        dispatch(getUserCardsThunk({ token: userToken }));
        dispatch(getUserInfoThunk({ token: userToken }));
      })();
    }
  }, []);

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
          clearFilters={clearFilters}
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
            clearFilters={clearFilters}
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
