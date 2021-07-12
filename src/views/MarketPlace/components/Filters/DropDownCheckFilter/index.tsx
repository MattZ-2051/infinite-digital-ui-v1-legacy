import React, { useState } from 'react';
import styled from 'styled-components/macro';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
// Icons
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ReactComponent as CheckboxIcon } from 'assets/svg/icons/checkbox.svg';
import { ReactComponent as CheckboxUnselectedIcon } from 'assets/svg/icons/checkbox-unselected.svg';

interface IProps {
  label?: string;
  width?: string;
  options: { id: string; name: string }[] | undefined;
  handleFilter: (name: string, data: any) => void;
  filterCategory: 'category' | 'brand' | 'series' | 'rarity' | 'creator';
  activeFilters: any;
}

const DropDownCheckFilter = ({
  label,
  width,
  options,
  handleFilter,
  filterCategory,
  activeFilters,
}: IProps) => {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const id = target.id;
    const checked = target.checked;
    const isCreator: boolean = filterCategory == 'creator';
    const oneIsActive: boolean = activeFilters.length == 1;
    if (checked && isCreator && oneIsActive) activeFilters = [];

    if (checked) {
      handleFilter(filterCategory, [...activeFilters, id]);
    } else {
      const filteredList = activeFilters.filter((el: string) => el !== id);
      handleFilter(filterCategory, filteredList);
    }
  };

  const [open, setOpen] = useState<boolean | undefined>(true);

  const handleChange = () => {
    setOpen(!open);
  };

  return (
    <div style={{ width: width || '311px', padding: '5px 0' }}>
      <FilterDiv onClick={handleChange}>
        <span style={{ color: '#888888', fontSize: '18px' }}>
          {label || 'Enter Label'}
        </span>
        {open ? (
          <DownArrow style={{ color: 'black' }} />
        ) : (
          <UpArrow style={{ color: 'black' }} />
        )}
      </FilterDiv>
      <HiddenDiv hidden={open} style={{ width: width || '311px' }}>
        {options instanceof Array &&
          options.map((option, index) => {
            return (
              <div
                style={{ padding: '0 10px', marginLeft: '-10px' }}
                key={index}
              >
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="start"
                      control={
                        <Check
                          style={{
                            color: 'black',
                            backgroundColor: 'transparent',
                          }}
                          id={option.id}
                          name={option.name}
                          checked={activeFilters?.indexOf(option.id) !== -1}
                          onChange={handleCheck}
                          color="default"
                          disableRipple
                          icon={<CheckboxUnselectedIcon />}
                          checkedIcon={<CheckboxIcon />}
                        />
                      }
                      label={option.name}
                      labelPlacement="end"
                      style={{
                        color: `${
                          activeFilters?.indexOf(option.id) !== -1
                            ? 'black'
                            : '#9e9e9e'
                        }`,
                      }}
                      color="default"
                    />
                  </FormGroup>
                </FormControl>
              </div>
            );
          })}
      </HiddenDiv>
    </div>
  );
};

const DownArrow = styled(KeyboardArrowDownIcon)`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const UpArrow = styled(KeyboardArrowUpIcon)`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const FilterContainer = styled.div`
  height: 40px;
  background-color: #fafafa;
  border-radius: 20px;
`;

export const Check = styled(Checkbox)`
  padding: 5px 9px;
  .Mui-checked {
    color: black;
  }
  .MuiIconButton-label {
    min-width: 22px;
  }
  /* .Mui-checked {
    svg {
      position: relative;
      top: 20px;
    }
  } */
`;

export const FilterDiv = styled.div`
  display: flex;
  padding: 8px 10px;
  margin-left: -10px;
  align-items: center;
  justify-content: space-between;
  color: #888888;
  background-color: white;
  border: none;
  border-radius: 20px;
  :hover {
    cursor: pointer;
    background-color: #f4f4f4;
    border-radius: 20px;
    color: black;
  }
`;

export const HiddenDiv = styled.div`
  color: black;
  overflow-y: auto;
  max-height: 190px;
`;

export const DropDownSpan = styled.span``;

export const DropDownDiv = styled.div`
  padding: 9px 16px;
  border-radius: 20px;
  :hover {
    background-color: #e5e5e5;
    color: white;
    cursor: pointer;
    color: black;
  }
`;

export default DropDownCheckFilter;
