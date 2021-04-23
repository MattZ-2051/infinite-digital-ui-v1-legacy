import React from 'react';
import styled from 'styled-components/macro';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from 'hooks/store';
import {
  updateFilter,
  restoreFilters,
} from 'store/marketplace/marketplaceSlice';
import Menu from './Menu';
import Date from './Date';
import PriceRange from './PriceRange';
import SelectedFilters from './SelectedFilters';
import DropDownCheckFilter from './DropDownCheckFilter';
import FilterChip from 'components/FilterChip';

export interface IProps {
  activeFilters: any;
  handleFilter: (name: string, data: string) => void;
}

const Filters = ({ handleFilter, activeFilters }: IProps) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [isHidden, setIsHidden] = useState<boolean | undefined>(false);

  const clearFilters = () => {
    history.push('/marketplace');
    dispatch(restoreFilters());
    setIsHidden(true);
  };

  return (
    <Container>
      <Menu
        handleFilter={handleFilter}
        activeFilterStatus={activeFilters.status}
      />
      <div style={{ paddingBottom: '30px' }}>
        <div
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: '#d6d6d6',
            borderRadius: '5px',
          }}
        ></div>
      </div>
      <ClearAllFilterContainer>
        <span style={{ fontWeight: 500, color: '#9e9e9e', fontSize: '24px' }}>
          Filter by
        </span>
        <div hidden={false}>
          <FilterChip type="clear" onClick={clearFilters} />
        </div>
      </ClearAllFilterContainer>

      <SelectedFilters
        handleFilter={handleFilter}
        activeFilters={activeFilters}
      />
      <Date handleFilter={handleFilter} />
      <PriceRange
        handleFilter={handleFilter}
        defaultFilter={activeFilters.price}
      />
      <DropDownCheckFilter
        label="Category"
        options={['category1', 'category 2', 'category 3']}
        handleFilter={handleFilter}
        filterCategory="category"
        activeFilters={activeFilters.category}
      />
      <DropDownCheckFilter
        label="Brand"
        options={['brand1', 'brand 2', 'brand 3']}
        handleFilter={handleFilter}
        filterCategory="brand"
        activeFilters={activeFilters.brand}
      />
      <DropDownCheckFilter
        label="Series"
        options={['series1', 'series 2', 'series 3']}
        handleFilter={handleFilter}
        filterCategory="series"
        activeFilters={activeFilters.series}
      />
      <DropDownCheckFilter
        label="Rarity"
        options={['Legendary', 'Epic', 'Rare', 'Uncommon']}
        handleFilter={handleFilter}
        filterCategory="rarity"
        activeFilters={activeFilters.rarity}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const ClearAllFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export default Filters;
