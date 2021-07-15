export interface ITabHeaderOptions {
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
  selectedTab: number;
  sortByTransactions: 'newest' | 'oldest';
  sortByActiveBids: 'newest' | 'oldest';
  setSortByTransactions: React.Dispatch<
    React.SetStateAction<'newest' | 'oldest'>
  >;
  setSortByActiveBids: React.Dispatch<
    React.SetStateAction<'newest' | 'oldest'>
  >;
}
