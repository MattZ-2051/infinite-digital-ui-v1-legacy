import React, { useState } from 'react';
import styled from 'styled-components';
import searchIcon from 'assets/svg/icons/search-icon.svg';
import * as S from './styles';

export interface IProps {
  placeholder?: string;
}

// const placeHolder = 'Search by brand, sneaker, model or handles...';

const SearchBar = ({ placeholder }: IProps) => {
  const [forSaleCheck, setForSaleCheck] = useState<boolean>(false);
  return (
    <SearchBarContainer>
      <img src={searchIcon} />
      <SearchBarInput placeholder={placeholder} />
      <S.ContainerCheckBox>
        <S.CustomCheckBox
          name="forSale"
          onChange={(e) => {
            setForSaleCheck(e.target.checked);
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
