import { useHistory } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styled from 'styled-components/macro';
import Pagination from '@material-ui/lab/Pagination';
// Local
import { getSkusThunk } from 'store/marketplace/marketplaceThunks';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import Filters from './Filters';
import {
  getDefaultParams,
  updateFilters,
  restoreFilters,
  updateFilter,
} from 'store/marketplace/marketplaceSlice';
// Components
import SearchInput from './Filters/SearchInput';
import SortByFilter from './Filters/SortByFilter';
import SkuTile from 'components/ProductTiles/SkuTile';
import ProductTile from 'components/ProductTiles/ProductTile';
import { ReactComponent as FilterIcon } from 'assets/svg/icons/filters.svg';
import { ReactComponent as CloseIcon } from 'assets/svg/icons/close.svg';

export interface IProps { }

const MarketPlace: React.FC<IProps> = () => {
  let history = useHistory();
  const dispatch = useAppDispatch();
  const [filtersVisible, setFiltersVisible] = useState(false);
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const activeFilters = useAppSelector((store) => store.marketplace.filters);
  const skus = useAppSelector((store) => store.marketplace.skus);
  const urlQueryString = window.location.search;
  const regenerateUrl = useRef(true);
  const isMounted = useRef(true);

  // Create the url query-string using the redux stored filters
  const createQueryString = (filters: {}) => {
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
    // dispatch(getSkusThunk({ queryParams: `?${urlQueryString.toString()}` }));
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
      dispatch(getSkusThunk({ token: '', queryParams: '' }));
    })();
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
            {skus instanceof Array &&
              skus.map((sku) => {

                let status: 'upcoming' | 'unique' | 'active' | 'no-sale' = 'upcoming';

                const currentTime = new Date().getTime();
                const skuStartDateTime = new Date(sku.minStartDate || "2021-04-12T19:03:02.439Z").getTime();
                let skuUpcomingTime: string = '';

                function calcDiff(date1, date2) {

                  var diff = (date2 - date1) / 1000;
                  diff = Math.abs(Math.floor(diff));

                  var days = Math.floor(diff / (24 * 60 * 60));
                  var leftSec = diff - days * 24 * 60 * 60;

                  var hrs = Math.floor(leftSec / (60 * 60));
                  var leftSec = leftSec - hrs * 60 * 60;

                  var min = Math.floor(leftSec / (60));
                  var leftSec = leftSec - min * 60;

                  return days + "d" + ' ' + hrs + "hr" + ' ' + min + 'm';

                }

                const checkStatus = () => {
                  if (skuStartDateTime > currentTime) {
                    status = "upcoming";
                    skuUpcomingTime = calcDiff(currentTime, skuStartDateTime);
                    return
                  } else if (sku.totalSupplyLeft > 0) {
                    status = "active";
                    return
                  } else if (sku.minSkuPrice === 0 || !sku.minSkuPrice) {
                    status = "no-sale";
                    return
                  } else {
                    status = 'upcoming'
                    skuUpcomingTime = calcDiff(currentTime, skuStartDateTime);
                    return
                  }
                }

                checkStatus();

                return (
                  <SkuTile
                    key={sku._id}
                    skuImg={sku.graphicUrl}
                    skuRarity={sku.rarity}
                    skuName={sku.name}
                    status={status}
                    skuSeries={sku.series.name}
                    skuTotalSupplyLeft={sku.totalSupplyLeft}
                    skuCirculatingSupply={sku.circulatingSupply}
                    skuStartDate={skuUpcomingTime}
                    skuMinPrice={sku.minSkuPrice}
                    skuTotalSupplyUpcoming={sku.skuTotalSupplyUpcoming}
                  />
                );
              })}
            {/* <SkuTile status="upcoming" skuStartDate="2021-04-05T18:03:02.439Z" />
            <SkuTile status="mult-listing" skuRarity="uncommon" skuStartDate="2021-04-05T18:03:02.439Z" />
            <SkuTile status="no-sale" skuRarity="epic" skuStartDate="2021-04-05T18:03:02.439Z" />
            <SkuTile status="unique" skuRarity="legendary" skuStartDate="2021-04-05T18:03:02.439Z" />
            <ProductTile status="no-active-listing" />
            <ProductTile status="active-listing" />
            <ProductTile status="purchased" /> */}
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

const ProductPanel = styled.div`
  width: 300px;
  min-width: 300px;
  height: 472px;
  border-radius: 5px;
  background-color: grey;
  border: 1px solid #4a4a4a;
  font-size: 70px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export default MarketPlace;
