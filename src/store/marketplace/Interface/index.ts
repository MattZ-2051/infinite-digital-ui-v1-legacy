export type ReleaseStatus = 'released' | 'upcoming' | ''; // 'noOneSelling'

export interface IFilters {
  status: ReleaseStatus;
  date: string[] | null;
  price: number[];
  category: string[];
  brand: string[];
  series: string[];
  search: string;
  rarity: string[];
  creator: string[];
}

export interface IPagination {
  page: string;
  perPage: string;
}

export interface IState {
  loading: string;
  error: string | null;
  filters: IFilters;
  sortBy: string; // 'startDate' | 'rarity' | 'price
  pagination: IPagination;
}
