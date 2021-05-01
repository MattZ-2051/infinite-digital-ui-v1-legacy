import React from 'react';
import { useState } from 'react';
import styled from 'styled-components/macro';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

interface IProps {
  options: any; //TODO: change type
  handleSort: (sortValue: string) => void;
  activeSort: string;
}

const SortByFilter = ({ options, handleSort, activeSort }: IProps) => {
  const [isHidden, setIsHidden] = useState<boolean | undefined>(true);
  const getCurrentLabel = () => {
    return options.filter((option) => {
      option.value === activeSort;
    });
  };
  const [label, setLabel] = useState<string | undefined>(
    getCurrentLabel().name
  );
  const handleDropDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const filterValue = target.id;
    const filterName = target.dataset.name;

    handleSort(filterValue);
    setLabel(filterName);
    setIsHidden(true);
  };

  const handleChange = () => {
    setIsHidden(!isHidden);
  };

  // Delete the current selected from the options
  const getNewOptions = (option) => {
    return option.value !== activeSort;
  };

  options = options.filter(getNewOptions);

  return (
    <S.Container>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <S.SortBy>Sort by:</S.SortBy>
        <S.Label>{label}</S.Label>
        {isHidden ? (
          <S.DownArrow
            style={{ color: 'black', fontSize: '35px', marginBottom: '5px' }}
            onClick={handleChange}
          />
        ) : (
          <S.UpArrow
            style={{ color: 'black', fontSize: '35px', marginBottom: '5px' }}
            onClick={handleChange}
          />
        )}
      </div>
      <>
        {isHidden ? null : (
          <S.HiddenDiv>
            {options instanceof Array &&
              options.map((option, index) => {
                return (
                  <S.DropDownDiv
                    key={index}
                    id={option.value}
                    data-name={option.name}
                    onClick={handleDropDown}
                    style={{ height: '38px' }}
                  >
                    <p style={{ fontWeight: 400, fontSize: '16px' }}>
                      {option.name}
                    </p>
                  </S.DropDownDiv>
                );
              })}
          </S.HiddenDiv>
        )}
      </>
    </S.Container>
  );
};

const S: any = {};

S.Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 300px;
  position: relative;
`;

S.DownArrow = styled(KeyboardArrowDownIcon)`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

S.UpArrow = styled(KeyboardArrowUpIcon)`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

S.SortBy = styled.span`
  color: #9e9e9e;
  font-weight: 500;
  font-size: 18px;
  padding-right: 8px;
`;

S.Label = styled.span`
  font-weight: 500;
  font-size: 18px;
  text-align: end;
`;

S.HiddenDiv = styled.div`
  color: black;
  overflow-y: auto;
  position: absolute;
  width: 180px;
  background-color: white;
  right: 5%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  box-shadow: 2px 2px 8px 2px #ccc;
  z-index: 1;
  top: 35px;
`;

S.DropDownDiv = styled.div`
  padding: 9px 16px;
  border-radius: 20px;
  width: 160px;
  color: #9e9e9e;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  :hover {
    background-color: #d6d6d6;
    color: white;
    cursor: pointer;
    color: black;
  }
`;

export default SortByFilter;
