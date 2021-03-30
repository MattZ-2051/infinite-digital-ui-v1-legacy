import { useState } from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { StoreRounded } from '@material-ui/icons';
// Local
import { useAppDispatch, useAppSelector } from 'hooks/store';
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
import Range from './Range';

export interface IProps {}

const Filters: React.FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const activeFilters = useAppSelector((store) => store.marketplace.filters);
  let history = useHistory();

  // console.log('activeFilters: ', activeFilters);

  const handleFilter = (name: string, value: any) => {
    const payload = {
      filterName: name,
      filterValue: value,
    };

    dispatch(updateFilter(payload));
  };

  const clearFilters = () => {
    history.push('/marketplace');
    dispatch(restoreFilters());
  };

  return (
    <Container>
      <Menu handleFilter={handleFilter} />
      <button onClick={clearFilters}>Clear all</button>
      <Date handleFilter={handleFilter} />
      <Range handleFilter={handleFilter} defaultFilter={activeFilters.price} />
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
