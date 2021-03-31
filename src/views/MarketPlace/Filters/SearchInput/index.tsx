import { useState } from 'react';
import { useDebounce, useUpdateEffect } from 'react-use';

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
    setSearchValue(inputValue);
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
    <input
      onChange={handleInput}
      name="search"
      value={searchValue}
      type="text"
    />
  );
};

export default SearchInput;
