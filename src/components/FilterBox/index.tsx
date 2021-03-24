import styled from 'styled-components/macro';
import React from 'react';

export interface IProps {
  width?: string;
  type?: string;
  label?: string;
  options?: string[];
}


const FilterBox = ({ label, type, options }: IProps) => {
  return (
    <StyledFilterContainer>
      {type === 'dropDown' && (
        <StyledDropDown>
          <option disabled selected>
            {label || "Enter Label"}
          </option>
          {options instanceof Array &&
            options.map((option, index) => {
              return (
                <option value={option} key={index}>
                  {option}
                </option>
              )
            })}
        </StyledDropDown>
      )}
      {type === 'date' && (
        <input style={{ border: 'none', color: 'black', backgroundColor: '#F4F4F4' }} type="date" placeholder={label} />
      )}

    </StyledFilterContainer>
  )
}

const StyledFilterContainer = styled.div<IProps>`
  height: 40px;
  background-color: #F4F4F4;
`;

const StyledDropDown = styled.select<IProps>`
  padding: 12px;
  color: #888888;
  background-color: #F4F4F4;
  border: none;
  cursor: pointer;
  width: ${(props) => `${props.width}` || '301px'}
`;


export default FilterBox
