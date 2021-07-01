import { createSlice } from '@reduxjs/toolkit';
import { IFilters, IPagination, IState, ReleaseStatus } from './Interface';

const defaultFilters: IFilters = {
  status: '',
  date: [],
  price: [],
  category: [],
  brand: [],
  series: [],
  search: '',
  rarity: [],
  creator: [],
};

export const getDefaultParams = () => {
  const queryString = window.location.search;
  return new URLSearchParams(queryString);
};

// Get the filters, pagination and sortBy from url params
export const processUrlParams = () => {
  const urlParams: any = getDefaultParams(); //TODO: change type
  const filters: IFilters = JSON.parse(JSON.stringify(defaultFilters));
  const pagination: IPagination = {
    page: '1',
    perPage: '6',
  };
  let sortBy = 'startDate:asc';

  for (const param of urlParams) {
    const paramName: string = param[0];
    const paramValue: string = param[1];

    switch (paramName) {
      case 'startDate':
      case 'endDate':
        filters.date!.push(paramValue);
        break;
      case 'minPrice':
      case 'maxPrice':
        filters.price!.push(Number(paramValue));
        break;
      case 'status':
        filters.status = paramValue as ReleaseStatus;
        break;
      case 'search':
        filters.search = paramValue;
        break;
      case 'sortBy':
        sortBy = paramValue;
        break;
      case 'page':
        pagination.page = paramValue;
        break;
      case 'per_page':
        pagination.perPage = paramValue;
        break;
      default:
        if (filters[paramName]) filters[paramName] = paramValue.split(',');
        break;
    }
  }
  return {
    filters,
    pagination,
    sortBy,
  };
};

const initialState: IState = {
  loading: 'idle',
  error: null,
  filters: processUrlParams().filters,
  sortBy: processUrlParams().sortBy,
  pagination: processUrlParams().pagination,
};

export const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      const { filterName, filterValue } = action.payload;
      state.filters[filterName] = filterValue;
      state.pagination = {
        page: '1',
        perPage: '6',
      };
    },
    updateFilters: (state, action) => {
      state.filters = action.payload;
      state.pagination = {
        page: '1',
        perPage: '6',
      };
    },
    restoreFilters: (state) => {
      state.filters = defaultFilters;
      state.pagination = {
        page: '1',
        perPage: '6',
      };
    },
    updatePagination: (state, action) => {
      state.pagination = action.payload;
    },
    updateSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setMarketplaceState: (state, action) => {
      //Useful for the browser back button
      const { filters, pagination, sortBy } = action.payload;
      state.filters = filters;
      state.pagination = pagination;
      state.sortBy = sortBy;
    },
  },
});

const { actions } = marketplaceSlice;
export const {
  updateFilter,
  updateFilters,
  restoreFilters,
  updatePagination,
  updateSortBy,
  setMarketplaceState,
} = actions;
export default marketplaceSlice.reducer;
