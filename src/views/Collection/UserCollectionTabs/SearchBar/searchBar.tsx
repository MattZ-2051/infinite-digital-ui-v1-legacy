import { useState, useEffect } from 'react';
import { useDebounce, useUpdateEffect } from 'react-use';
import { ReactComponent as SearchIcon } from 'assets/svg/icons/search-icon.svg';

import * as S from './styles';
export interface IProps {
  handleSearch: (searchCriteria: string) => void;
  mobileView: boolean;
  themeStyle: 'light' | 'dark';
}

export const SearchBar = ({ handleSearch, mobileView, themeStyle }: IProps) => {
  const activeFilterSearch = '';
  const [searchValue, setSearchValue] = useState(activeFilterSearch);
  const [searchMobile, setSearchMobile] = useState<string>('');
  const [isVisibleInput, setIsVisibleInput] = useState<boolean>(false);

  useEffect(() => {
    setSearchValue(activeFilterSearch);
    setSearchMobile('');
  }, [activeFilterSearch]);
  const [debouncedValue, setDebouncedValue] = useState('');

  const handleInput = (e: any) => {
    const element = e.target;
    const inputValue = element.value;
    setSearchValue(inputValue); // replace(/[^A-Za-z]/g,'')
  };

  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(searchValue);
    },
    400,
    [searchValue]
  );

  useUpdateEffect(() => {
    handleSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <S.InputDiv>
      {!mobileView && (
        <SearchIcon
          style={{ color: '#9E9E9E', marginLeft: '15px', width: '15px' }}
        />
      )}
      <S.Input
        onChange={handleInput}
        name="search"
        value={searchValue}
        type="text"
        placeholder={
          mobileView ? 'Search...' : '*Select a product to view more details'
        }
        theme={themeStyle}
      />
      {mobileView && (
        <>
          {searchValue == '' && (
            <SearchIcon
              style={{ color: '#9E9E9E', marginRight: '24px', width: '15px' }}
            />
          )}
          {searchValue != '' && <S.Clear onClick={() => setSearchValue('')} />}
        </>
      )}
    </S.InputDiv>
  );
};

export default SearchBar;
