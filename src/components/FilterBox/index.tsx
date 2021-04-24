import React from 'react';
import styled from 'styled-components/macro';
import Checkbox from '@material-ui/core/Checkbox';
import RangeSlider from 'components/RangeSlider';
import { KeyboardDatePicker } from '@material-ui/pickers';
import DropDown from './DropDown';
import Date from './Date';
import CheckBox from './CheckBox';
import Sort from './Sort';

export interface IProps {
  type: string;
  label?: string;
  options?: string[];
  width?: string;
}

const FilterBox = ({ label, type, options, width }: IProps) => {
  return (
    <FilterContainer style={{ width: width || '301px' }}>
      {type === 'dropdown' && (
        <DropDown label={label} options={options} width={width || '301px'} />
      )}
      {type === 'date' && <Date />}
      {type === 'checkbox' && (
        <CheckBox label={label} options={options} width={width || '301px'} />
      )}
      {type === 'range' && (
        <>
          <RangeSlider />
        </>
      )}
      {type === 'sort' && <Sort />}
    </FilterContainer>
  );
};

export const FilterContainer = styled.div`
  height: 40px;
  background-color: #fafafa;
  border-radius: 20px;
`;

export const Check = styled(Checkbox)`
  .Mui-checked {
    color: black;
  }

  .MuiCheckbox-root {
    &:hover {
      color: black;
      box-shadow: 0px 0px 0px 8px rgb(0 0 0 / 16%);
      background-color: blue;
    }
  }
`;

export const FilterDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  justify-content: space-between;
  color: #888888;
  background-color: #fafafa;
  border: none;
  border-radius: 20px;
  :hover {
    cursor: pointer;
    background-color: #d6d6d6;
    border-radius: 20px;
    color: black;
  }
`;

export const HiddenDiv = styled.div`
  background-color: #fafafa;
  color: black;
  overflow-y: auto;
  max-height: 190px;
`;

export const DropDownSpan = styled.span``;

export const DropDownDiv = styled.div`
  padding: 9px 16px;
  border-radius: 20px;
  :hover {
    background-color: #d6d6d6;
    color: white;
    cursor: pointer;
    color: black;
  }
`;

export const DatePickers = styled(KeyboardDatePicker)`
  && {
    .MuiPickersDay-daySelected {
      background-color: black;
    }
  }
`;

export default FilterBox;
