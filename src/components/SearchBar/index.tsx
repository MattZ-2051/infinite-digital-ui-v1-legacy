import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import searchIcon from 'assets/svg/icons/search-icon.svg';
import * as S from './styles';

export interface IProps {
  placeholder?: string;
  onSearch: (text: string) => any;
  onChecked: (check: boolean) => any;
}

const SearchBar = ({ placeholder, onSearch, onChecked }: IProps) => {
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    const timerId = setTimeout(() => onSearch(value), 400);
    return () => clearTimeout(timerId);
  }, [value]);

  return (
    <SearchBarContainer>
      <img src={searchIcon} />
      <SearchBarInput
        placeholder={placeholder}
        onChange={(ev) => setValue(ev.target.value)}
        value={value}
      />
      <S.ContainerCheckBox>
        <S.CustomCheckBox
          name="forSale"
          onChange={(e) => {
            onChecked(e.target.checked);
          }}
        />
        <S.Label>For sale</S.Label>
      </S.ContainerCheckBox>
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  width: 610px;
  height: 40px;
  /* background-color: #f4f4f4; */
  display: flex;
  align-items: center;
  padding: 9px 12px;
`;

const SearchBarInput = styled.input`
  width: 100%;
  color: white;
  border: none;
  background-color: transparent;
  font-size: 16px;
  line-height: 20px;
  margin-left: 20px;
  &:focus {
    outline: none;
  }
`;

export default SearchBar;
