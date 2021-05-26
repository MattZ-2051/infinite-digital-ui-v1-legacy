import styled from 'styled-components/macro';
import { useState, useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';
import { restoreFilters } from 'store/marketplace/marketplaceSlice';
// Local
import { getCategories } from 'services/api/categoryService';
import { getSeries } from 'services/api/seriesService';
import { getCreators } from 'services/api/userService';
import { User } from 'entities/user';
// Components
import Menu from './Menu';
import Date from './Date';
import PriceRange from './PriceRange';
import SelectedFilters from './SelectedFilters';
import DropDownCheckFilter from './DropDownCheckFilter';
import FilterChip from 'components/FilterChip';

export interface IProps {
  activeFilters: any; //TODO: change type
  handleFilter: (name: string, data: string) => void;
}

const Filters = ({ handleFilter, activeFilters }: IProps) => {
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([]);
  const [creators, setCreators] = useState([]);

  const dropDownOptions = {
    category: categories,
    rarity: [
      { id: 'legendary', name: 'Legendary' },
      { id: 'epic', name: 'Epic' },
      { id: 'rare', name: 'Rare' },
      { id: 'uncommon', name: 'Uncommon' },
    ],
    series,
    creator: creators.map((el: User) => {
      return { id: el.username, name: el.username };
    }),
  };

  //TODO: refactor later
  // Get checkboxes options
  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((e) => {
        console.log(e);
      });

    getSeries()
      .then((data) => {
        setSeries(data);
      })
      .catch((e) => {
        console.log(e);
      });

    getCreators().then((data) => {
      setCreators(
        data.filter((el) => {
          return el.id !== '60a4921addc7af020455d315';
        })
      );
    });
  }, []);

  useEffect(() => {
    return () => {
      clearFilters();
    };
  }, []);

  const clearFilters = () => {
    dispatch(restoreFilters());
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
        />
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
        options={dropDownOptions}
      />

      {/* <Date handleFilter={handleFilter} /> */}

      <PriceRange
        handleFilter={handleFilter}
        defaultFilter={activeFilters.price}
      />

      <DropDownCheckFilter
        label="Category"
        options={dropDownOptions.category}
        handleFilter={handleFilter}
        filterCategory="category"
        activeFilters={activeFilters.category}
      />
      {/* <DropDownCheckFilter
        label="Series"
        options={dropDownOptions.series}
        handleFilter={handleFilter}
        filterCategory="series"
        activeFilters={activeFilters.series}
      /> */}
      <DropDownCheckFilter
        label="Rarity"
        options={dropDownOptions.rarity}
        handleFilter={handleFilter}
        filterCategory="rarity"
        activeFilters={activeFilters.rarity}
      />
      <DropDownCheckFilter
        label="Creators"
        options={dropDownOptions.creator}
        handleFilter={handleFilter}
        filterCategory="issuerName"
        activeFilters={activeFilters.issuerName}
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
