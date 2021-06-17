import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import searchIcon from 'assets/svg/icons/search-icon.svg';
import * as S from './styles';

export interface IProps {
  placeholder?: string;
  onSearch: (text: string) => any;
  onChecked: (check: boolean) => void;
  onSort: (value) => any;
  sortAsc: boolean;
}

const SearchBar = ({
  placeholder,
  onSearch,
  onChecked,
  onSort,
  sortAsc,
}: IProps) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    const timerId = setTimeout(() => onSearch(value), 400);
    return () => clearTimeout(timerId);
  }, [value]);

  return (
    <S.SearchBarContainer>
      <S.ContainerInputImg>
        <img src={searchIcon} />
        <S.SearchBarInput
          placeholder={placeholder}
          onChange={(ev) => setValue(ev.target.value)}
          value={value}
        />
      </S.ContainerInputImg>
      <S.ContainerCheckBox>
        <S.CustomCheckBox
          name="forSale"
          onChange={(e) => {
            onChecked(e.target.checked);
          }}
        />
        <S.Label>For sale</S.Label>
      </S.ContainerCheckBox>
      <S.ContainerSort>Sort by: &nbsp;</S.ContainerSort>{' '}
      <S.SerialLabel>Serial</S.SerialLabel>
      {sortAsc ? (
        <S.ArrowUp onClick={() => onSort(!sortAsc)} className="arrow" />
      ) : (
        <S.ArrowDown onClick={() => onSort(!sortAsc)} className="arrow" />
      )}
    </S.SearchBarContainer>
  );
};

export default SearchBar;
