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
import { IUser } from 'services/api/userService/Interfaces';
import { ISeries } from 'services/api/seriesService/Interfaces/ISeries';

export interface IProps {
  activeFilters: any; //TODO: change type
  handleFilter: (name: string, data: string) => void;
  maxPrice?: number;
  skuTotal?: number;
  loading?: boolean;
}

const Filters = ({
  handleFilter,
  activeFilters,
  maxPrice,
  loading,
}: IProps) => {
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState<ISeries[]>([]);
  const [creators, setCreators] = useState<IUser[] | undefined>([]);

  const dropDownOptions = {
    category: categories,
    rarity: [
      { id: 'legendary', name: 'Legendary' },
      { id: 'epic', name: 'Epic' },
      { id: 'rare', name: 'Rare' },
      { id: 'uncommon', name: 'Uncommon' },
    ],
    series,
    creator: creators?.map((el: IUser) => {
      return { id: el.id, name: el.username };
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
        data?.filter((el: IUser) => {
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
        loading={loading}
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
        maxValue={maxPrice}
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
        filterCategory="creator"
        activeFilters={activeFilters.creator}
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
