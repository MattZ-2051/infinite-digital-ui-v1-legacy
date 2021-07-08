import React from 'react';
import { useState } from 'react';
import styled from 'styled-components/macro';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

interface IProps {
  options: any; //TODO: change type
  handleSort: (sortValue: 'newest' | 'oldest') => void;
  activeSort: string;
}

const SortByFilter = ({ options, handleSort, activeSort }: IProps) => {
  const [isHidden, setIsHidden] = useState<boolean | undefined>(true);
  const getCurrentLabel = () => {
    return options.find((option) => {
      return option.value === activeSort;
    });
  };
  const currentLabel = getCurrentLabel();
  const handleChange = () => {
    setIsHidden(!isHidden);
  };

  // Delete the current selected from the options
  const getNewOptions = (option) => {
    return option.value !== activeSort;
  };

  const newOptions = options.filter(getNewOptions);

  return (
    <S.Container>
      <div style={{ display: 'flex' }}>
        <S.SortBy>Sort by:</S.SortBy>
        <S.Label>{currentLabel?.name}</S.Label>
        {isHidden ? (
          <S.DownArrow
            style={{ color: 'black', fontSize: '30px', marginBottom: '5px' }}
            onClick={handleChange}
          />
        ) : (
          <S.UpArrow
            style={{ color: 'black', fontSize: '30px', marginBottom: '5px' }}
            onClick={handleChange}
          />
        )}
      </div>
      <>
        {isHidden ? null : (
          <S.HiddenDiv>
            {newOptions instanceof Array &&
              newOptions.map((option, index) => {
                return (
                  <S.DropDownDiv
                    key={option.value}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                      handleSort(option.value);
                      setIsHidden(true);
                    }}
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
  /* display: flex; */
  justify-content: flex-end;
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
  width: max-content;
  color: black;
  overflow-y: auto;
  position: absolute;
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
