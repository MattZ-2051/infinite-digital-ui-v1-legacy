import { createSlice } from '@reduxjs/toolkit';

type ReleaseStatus = 'all' | 'released' | 'upcoming' | 'noOneSelling';

interface IFilters {
  status: ReleaseStatus;
  date: string[] | null;
  price: number[];
  category: string[];
  brand: string[];
  series: string[];
  search: string;
  sort: string;
  rarity: string[];
}

const defaultFilters: IFilters = {
  status: 'all',
  date: [],
  price: [],
  category: [],
  brand: [],
  series: [],
  search: '',
  sort: '',
  rarity: [],
};

export const getDefaultParams = () => {
  // console.log('%c getDefaultParams ', 'background: #222; color: #bada55');

  const queryString = window.location.search;
  const urlParams: any = new URLSearchParams(queryString);
  const filters: IFilters = JSON.parse(JSON.stringify(defaultFilters));

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
      case 'sort':
        filters.sort = paramValue;
        break;
      default:
        if (filters[paramName]) filters[paramName] = paramValue.split('+');
        break;
    }
  }
  return filters;
};

interface IState {
  loading: string;
  error: string | null;
  filters: IFilters;
}

const initialState: IState = {
  loading: 'idle',
  error: null,
  filters: getDefaultParams(),
};

export const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      const { filterName, filterValue } = action.payload;
      state.filters[filterName] = filterValue;
    },
    updateFilters: (state, action) => {
      state.filters = action.payload;
    },
    restoreFilters: (state) => {
      console.log('ejecuta');
      state.filters = defaultFilters;
    },
  },
});

const { actions } = marketplaceSlice;
export const { updateFilter, updateFilters, restoreFilters } = actions;
export default marketplaceSlice.reducer;
