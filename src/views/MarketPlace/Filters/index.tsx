import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
// Local
import { useAppDispatch } from 'hooks/store';
import {
  updateFilter,
  restoreFilters,
} from 'store/marketplace/marketplaceSlice';

// Components
import Menu from './Menu';
import Date from './Date';
import Category from './Category';
import Brand from './Brand';
import Series from './Series';
import PriceRange from './PriceRange';
import SelectedFilters from './SelectedFilters';

export interface IProps {
  activeFilters: any;
  handleFilter: (name: string, data: string) => void;
}

const Filters: React.FC<IProps> = ({ handleFilter, activeFilters }) => {
  const dispatch = useAppDispatch();
  let history = useHistory();

  const clearFilters = () => {
    history.push('/marketplace');
    dispatch(restoreFilters());
  };

  return (
    <Container>
      <Menu handleFilter={handleFilter} />
      <SelectedFilters
        handleFilter={handleFilter}
        activeFilters={activeFilters}
      />
      <button onClick={clearFilters}>Clear all</button>
      <Date handleFilter={handleFilter} />
      <PriceRange
        handleFilter={handleFilter}
        defaultFilter={activeFilters.price}
      />
      <Category handleFilter={handleFilter} />
      <Brand />
      <Series />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: #bbbbbb;
  border: 1px solid #7614e6;
`;

export default Filters;
