import { useHistory } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// Local
import { getSkusThunk } from 'store/marketplace/marketplaceThunks';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import Filters from './Filters';
import {
  getDefaultParams,
  updateFilters,
} from 'store/marketplace/marketplaceSlice';

export interface IProps {}

const MarketPlace: React.FC<IProps> = () => {
  let history = useHistory();
  const dispatch = useAppDispatch();
  const [filtersVisible, setFiltersVisible] = useState(true); // TODO set to false later
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const activeFilters = useAppSelector((store) => store.marketplace.filters);
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
    dispatch(getSkusThunk({ queryParams: `?${urlQueryString.toString()}` }));
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

  return (
    <Container>
      <Header>
        <h2>MarketPlace</h2>

        <ToggleFilter>
          <button onClick={toggleFilters}>Sidebar</button>
        </ToggleFilter>

        <div>
          Sort by:
          <button>Most Popular</button>
          <button>New releases</button>
        </div>
      </Header>

      {filtersVisible && matchesMobile && <Filters />}

      <Main>
        <Sidebar>
          <Filters />
        </Sidebar>

        <Content>
          <ProductsGrid>
            <ProductPanel>1</ProductPanel>
            <ProductPanel>2</ProductPanel>
            <ProductPanel>3</ProductPanel>
            <ProductPanel>4</ProductPanel>
          </ProductsGrid>
        </Content>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  width: 1440px;
  margin: auto;
  padding: 48px 80px 48px 80px;
  border: 1px solid red;

  @media screen and (max-width: 1440px) {
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border: 1px solid #14e642;
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
  background-color: #bbbbbb;
  border: 1px solid #7614e6;
  margin-right: 24px;

  @media screen and (max-width: 1140px) {
    display: none;
  }
`;

const ToggleFilter = styled.div`
  display: none;
  @media screen and (max-width: 1140px) {
    display: block;
  }
`;

const ProductsGrid = styled.div`
  margin: auto;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fit, 300px);
  justify-content: space-evenly;
  border: 1px solid #00824c;
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

export default MarketPlace;
