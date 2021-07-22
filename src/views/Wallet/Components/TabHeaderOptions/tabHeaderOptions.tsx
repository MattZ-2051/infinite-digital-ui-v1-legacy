import TabOptions from '../tabOptions/tabOptions';
import SortByFilter from 'views/MarketPlace/components/Filters/SortByFilter';
import * as S from './styles';
import { ITabHeaderOptions } from './ITabHeaderOptions';

const TabHeaderOptions = ({
  setSelectedTab,
  selectedTab,
  sortByTransactions,
  sortByActiveBids,
  setSortByTransactions,
  setSortByActiveBids,
}: ITabHeaderOptions) => {
  return (
    <S.OptionsContainers>
      <TabOptions
        options={['Transaction History', 'Active Bids']}
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
      />

      <SortByFilter
        handleSort={(value) =>
          selectedTab === 0
            ? setSortByTransactions(value)
            : setSortByActiveBids(value)
        }
        activeSort={selectedTab === 0 ? sortByTransactions : sortByActiveBids}
        options={[
          { value: 'newest', name: 'Newest' },
          { value: 'oldest', name: 'Oldest' },
        ]}
      />
    </S.OptionsContainers>
  );
};

export default TabHeaderOptions;
