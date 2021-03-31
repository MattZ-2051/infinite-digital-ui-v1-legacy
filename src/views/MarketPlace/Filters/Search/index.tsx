import { useState } from 'react';
import { useDebounce, useUpdateEffect } from 'react-use';

export interface IProps {}

const Search: React.FC<IProps> = () => {
  const [searchValue, setSearchValue] = useState('');
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
    console.log('updeteo');
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

export default Search;
