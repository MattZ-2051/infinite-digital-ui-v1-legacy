import React from 'react';
import { useHistory } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styled from 'styled-components/macro';
import Pagination from '@material-ui/lab/Pagination';
// Local
import { getSkuTilesThunk } from 'store/sku/skuThunks';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Filters from './components/Filters';
import {
  getDefaultParams,
  updateFilters,
  updateFilter,
} from 'store/marketplace/marketplaceSlice';
// Components
import SearchInput from './components/Filters/SearchInput';
import SortByFilter from './components/Filters/SortByFilter';
import SkuTile from './components/SkuTile';
import { ReactComponent as FilterIcon } from 'assets/svg/icons/filters.svg';
import { ReactComponent as CloseIcon } from 'assets/svg/icons/close.svg';

const MarketPlace = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [filtersVisible, setFiltersVisible] = useState(false);
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const activeFilters = useAppSelector((store) => store.marketplace.filters);
  const skus = useAppSelector((store) => store.sku.skus);
  const urlQueryString = window.location.search;
  const regenerateUrl = useRef(true);
  const isMounted = useRef(true);

  // Create the url query-string using the redux stored filters
  const createQueryString = (filters) => {
    const params = new URLSearchParams();

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
            default:
              params.append(categoryName, categoryValue.join('+'));
              break;
          }
        } else {
          params.append(categoryName, categoryValue);
        }
      }
    });
    return params;
  };

  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
    } else {
      // Avoid regenerating the url if the user press the browser back button
      if (regenerateUrl.current) {
        const queryString = createQueryString(activeFilters);
        history.push(`/marketplace?${queryString.toString()}`);
      } else {
        regenerateUrl.current = true;
      }
    }
  }, [activeFilters]);

  const toggleFilters = () => {
    setFiltersVisible((filtersVisible) => !filtersVisible);
  };

  useEffect(() => {
    return history.listen(() => {
      if (history.action === 'POP') {
        regenerateUrl.current = false;
        const urlParams = getDefaultParams();
        dispatch(updateFilters(urlParams));
      }
    });
  }, [history]);

  const handleFilter = (name: string, value: any) => {
    const payload = {
      filterName: name,
      filterValue: value,
    };

    dispatch(updateFilter(payload));
  };

  useEffect(() => {
    (async () => {
      dispatch(
        getSkuTilesThunk({
          token: '',
          queryParams: `?${urlQueryString.toString()}`,
        })
      );
    })();
    // TODO: This may neeed to be refreshed more often
  }, [dispatch]);

  return (
    <Container>
      <Header>
        <h2>MarketPlace</h2>

        <SearchInput
          handleFilter={handleFilter}
          activeFilters={activeFilters}
        />

        <ToggleFilter onClick={toggleFilters}>
          {filtersVisible ? <CloseIcon /> : <FilterIcon />}
        </ToggleFilter>

        <SortByFilter
          options={[
            'Release Date',
            'Rarity',
            'Price high to low',
            'Price low to high',
          ]}
          handleFilter={handleFilter}
          activeFilterSort={activeFilters.sort}
        />
      </Header>

      {filtersVisible && matchesMobile && (
        <Filters handleFilter={handleFilter} activeFilters={activeFilters} />
      )}

      <Main>
        <Sidebar>
          <Filters handleFilter={handleFilter} activeFilters={activeFilters} />
        </Sidebar>
        <Content>
          <ProductsGrid>
            {/* Sku Tile data from store being rendered with Sku Tiles */}

            {skus instanceof Array &&
              skus.map((sku) => {
                return <SkuTile sku={sku} key={sku._id} />;
              })}
          </ProductsGrid>

          <PaginationContainer>
            <Pagination count={10} variant="outlined" />
          </PaginationContainer>
        </Content>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  width: 1440px;
  margin: auto;
  padding: 48px 80px 48px 80px;

  @media screen and (max-width: 1440px) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1140px) {
    flex-direction: column;
  }
`;

const Main = styled.main`
  display: flex;
`;

const Content = styled.section`
  width: 100%;
`;

const Sidebar = styled.aside`
  width: 300px;
  min-width: 300px;
  // height: 50vh;
  margin-right: 24px;

  @media screen and (max-width: 1140px) {
    display: none;
  }
`;

const ToggleFilter = styled.div`
  display: none;
  width: 40px;
  height: 40px;
  background-color: #f0f0f0;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #dadada;
  }

  @media screen and (max-width: 1140px) {
    display: block;
    margin: 10px 0 10px 0;
    display: flex;
  }
`;

const ProductsGrid = styled.div`
  margin: auto;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fit, 300px);
  justify-content: space-evenly;
  margin-top: 20px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export default MarketPlace;
