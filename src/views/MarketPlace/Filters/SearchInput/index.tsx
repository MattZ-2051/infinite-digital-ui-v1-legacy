import { useState } from 'react';
import { useDebounce, useUpdateEffect } from 'react-use';
import styled from 'styled-components';

export interface IProps {
  activeFilters: any,
  handleFilter: (name: string, data: string) => void;
}

const SearchInput: React.FC<IProps> = ({ handleFilter, activeFilters }) => {
  const [searchValue, setSearchValue] = useState(activeFilters.search || '');
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
    <Input
      onChange={handleInput}
      name="search"
      value={searchValue}
      type="text"
    />
  );
};

const Input = styled.input`
  height: 40px;
  min-width: 380px;
  border-radius: 30px;
  background-color: #f8f8f8;
  border: none;
  outline: none;
  text-indent: 20px;
`;

export default SearchInput;
