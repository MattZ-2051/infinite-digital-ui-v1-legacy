import React, { useState } from 'react'
import styled from 'styled-components';
import { FilterDiv, HiddenDiv, DropDownDiv, DropDownSpan } from '../index';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


interface IProps {
  options?: string[];
  label?: string;
  width?: string;
}

const DropDown = ({ label, options, width }: IProps) => {

  const [open, setOpen] = useState<boolean | undefined>(true);

  const handleChange = () => {
    setOpen(!open);
  }
  return (
    <>
      <FilterDiv onClick={handleChange}  >
        <span style={{ color: '#888888', fontSize: '18px' }}>{label || "Enter Label"}</span>
        {open
          ?
          <KeyboardArrowDownIcon style={{ color: 'black' }} />
          :
          <KeyboardArrowUpIcon style={{ color: 'black' }} />
        }
      </FilterDiv>
      <HiddenDiv hidden={open} style={{ width: width || '301px' }}>
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
  )
}

export default DropDown
