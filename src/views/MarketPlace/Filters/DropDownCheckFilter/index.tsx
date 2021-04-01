import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import { useRef } from 'react';
import { useEffectOnce } from 'react-use';


interface IProps {
  label?: string;
  width?: string;
  options?: string[];
  handleFilter: (name: string, data: any) => void;
  filterCategory: 'category' | 'brand' | 'series';
  activeFilters: any;
}

const DropDownCheckFilter = ({ label, width, options, handleFilter, filterCategory, activeFilters }: IProps) => {

  const selectedItems = useRef<any>([]);

  useEffectOnce(() => {
    selectedItems.current.push(...activeFilters)
  });

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const value = target.checked;

    if (value) {
      selectedItems.current.push(name);
    } else {
      selectedItems.current = selectedItems.current.filter(
        (item: string) => item !== name
      );
    }
    handleFilter(filterCategory, [...selectedItems.current]);
  };

  const [open, setOpen] = useState<boolean | undefined>(true);

  const handleChange = () => {
    setOpen(!open);
  }

  return (
    <div style={{ width: width || '301px', marginRight: '50px' }}>
      <FilterDiv onClick={handleChange}  >
        <span style={{ color: '#888888', fontSize: '18px' }}>{label || "Enter Label"}</span>
        {open
          ?
          <DownArrow style={{ color: 'black' }} />
          :
          <UpArrow style={{ color: 'black' }} />
        }
      </FilterDiv>
      <HiddenDiv hidden={open} style={{ width: width || '301px' }}>
        {options instanceof Array &&
          options.map((option, index) => {

            return (
              <div style={{ padding: '6px 16px' }} key={index}>
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="start"
                      control=
                      {<Check
                        style={{ color: 'black' }}
                        id={option}
                        name={option}
                        checked={activeFilters.indexOf(option) !== -1}
                        onChange={handleCheck}
                      />
                      }
                      label={option}
                      labelPlacement="end"
                      style={{ color: '#9e9e9e' }}
                      color='default'
                    />
                  </FormGroup>
                </FormControl>

              </div>
            )
          })}
      </HiddenDiv>
    </div>
  )
}

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
  .Mui-checked {
    color: black;
  }

  .MuiCheckbox-root {
    &:hover {
      color: black;
      box-shadow: 0px 0px 0px 8px rgb(0 30 10 / 16%);
      background-color: blue;
    }
  }
`;

export const FilterDiv = styled.div`
  display: flex;
  padding: 8px 10px;
  align-items: center;
  justify-content: space-between;
  color: #888888;
  background-color: #fafafa;
  border: none;
  border-radius: 20px;
  :hover {
    cursor: pointer;
    background-color: #D6D6D6;
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

export const DropDownSpan = styled.span`
`;

export const DropDownDiv = styled.div`
  padding: 9px 16px;
  border-radius: 20px;
  :hover {
    background-color: #D6D6D6;
    color: white;
    cursor: pointer;
    color: black;
  }
`;

export default DropDownCheckFilter;
