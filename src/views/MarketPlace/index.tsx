import { useState } from 'react';
import styled from 'styled-components/macro';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// Local
import Filters from './Filters';

export interface IProps {}

const MarketPlace: React.FC<IProps> = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const matchesMobile = useMediaQuery('(max-width:1140px)');

  const toggleFilters = () => {
    setFiltersVisible((filtersVisible) => !filtersVisible);
  };

  return (
    <Container>
      <Header>
        <h2>MarketPlace</h2>

        <ToggleFilter>
          <button onClick={toggleFilters}>Sidebar</button>
        </ToggleFilter>

        <div>Sort by: Most Popular</div>
      </Header>

      {(filtersVisible && matchesMobile) && <Filters />}

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
            <ProductPanel>5</ProductPanel>
            <ProductPanel>6</ProductPanel>
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
