import styled from 'styled-components/macro';
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export interface IProps {
  width?: string;
  type: string;
  label: string;
  options?: string[];
}

export interface StyleProps {
  width?: string
}


const FilterBox = ({ label, type, options }: IProps) => {

  const [open, setOpen] = useState<boolean | undefined>(true);

  const handleChange = () => {
    setOpen(!open);
  }
  return (
    <FilterContainer>
      {type === 'dropDown' && (
        <>
          <FilterDiv >
            <span style={{ color: '#888888', }}>{label || "Enter Label"}</span>
            {open
              ?
              <KeyboardArrowDownIcon style={{ color: 'black' }} onClick={handleChange} />
              :
              <KeyboardArrowUpIcon style={{ color: 'black' }} onClick={handleChange} />
            }
          </FilterDiv>
          <HiddenDiv hidden={open}>
            {options instanceof Array &&
              options.map((option, index) => {
                return (
                  <DropDownDiv style={{ height: '38px' }} key={index}>
                    <DropDownSpan>{option}</DropDownSpan>
                  </DropDownDiv>
                )
              })}
          </HiddenDiv>
        </>
      )}
      {type === 'date' && (
        <input style={{ border: 'none', color: 'black', backgroundColor: '#F4F4F4' }} type="date" placeholder={label} />
      )}

    </FilterContainer>
  )
}

const FilterContainer = styled.div<StyleProps>`
  height: 40px;
  background-color: #F4F4F4;
  width: ${(props) => `${props.width}` || '301px'}

`;

const FilterDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  justify-content: space-between;
  color: #888888;
  background-color: #F4F4F4;
  :hover {
    cursor: pointer;
  }
`;

const HiddenDiv = styled.div<StyleProps>`
  background-color: #F4F4F4;
  color: black;
  width: ${(props) => `${props.width}` || '301px'}

`;

const DropDownSpan = styled.span`

`;

const DropDownDiv = styled.div`
  padding: 9px 16px;
  :hover {
    background-color: black;
    color: white;
    cursor: pointer;
  }
`;


export default FilterBox
