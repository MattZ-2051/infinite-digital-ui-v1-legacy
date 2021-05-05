import React, { useState, useEffect } from 'react';
import { useDebounce, useUpdateEffect } from 'react-use';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

export interface IProps {
  activeFilters: any;
  handleFilter: (name: string, data: string) => void;
}

const SearchInput = ({ handleFilter, activeFilters }: IProps) => {
  const activeFilterSearch = activeFilters.search || '';
  const [searchValue, setSearchValue] = useState(activeFilterSearch);
  useEffect(() => {
    setSearchValue(activeFilterSearch);
  }, [activeFilterSearch]);
  const [debouncedValue, setDebouncedValue] = useState('');

  const handleInput = (e: any) => {
    const element = e.target;
    //const inputName = element.name;
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
    handleFilter('search', debouncedValue);
  }, [debouncedValue]);

  return (
    <>
      <InputDiv>
        <SearchIcon style={{ color: '#9E9E9E', marginLeft: '15px' }} />
        <Input
          onChange={handleInput}
          name="search"
          value={searchValue}
          type="text"
          placeholder="Search by name"
        />
      </InputDiv>
    </>
  );
};

const InputDiv = styled.div`
  height: 40px;
  min-width: 380px;
  border-radius: 30px;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  outline: none;
  text-indent: 20px;
  height: 40px;
  min-width: 380px;
  background-color: #f8f8f8;
  border-radius: 30px;
`;

export default SearchInput;
