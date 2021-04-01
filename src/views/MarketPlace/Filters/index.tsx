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
import DropDownCheckFilter from './DropDownCheckFilter';

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
      <Menu handleFilter={handleFilter} activeFilterStatus={activeFilters.status} />
      <SelectedFilters
        handleFilter={handleFilter}
        activeFilters={activeFilters}
      />
      <button onClick={clearFilters}>Clear all</button>
      <Date handleFilter={handleFilter} />
      <PriceRange handleFilter={handleFilter} defaultFilter={activeFilters.price} />
      <DropDownCheckFilter label="Category" options={['category1', 'category 2', 'category 3']} handleFilter={handleFilter} />
      <DropDownCheckFilter label="Brand" options={['brand1', 'brand 2', 'brand 3']} handleFilter={handleFilter} />
      <DropDownCheckFilter label="Series" options={['series1', 'series 2', 'series 3']} handleFilter={handleFilter} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default Filters;
