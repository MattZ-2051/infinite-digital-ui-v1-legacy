import styled from 'styled-components/macro';
import React, { useState } from 'react';
import Chip from '@material-ui/core/Chip';


export interface IProps {
  label: string
}

const FilterChip = ({ label }: IProps) => {

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <div style={{ padding: '0px 5px' }}>
      <StyledChip
        label={label || "Enter Label"}
        onDelete={handleDelete}
      />
    </div>
  )
}

const StyledChip = styled(Chip)`
  background-color: black;
  color: white;
  height: 23px;
  width: 86px;
  font-size: 12px;
  width: 100%;
  .MuiChip-deleteIcon {
    color: white;
  }
`;
export default FilterChip;
