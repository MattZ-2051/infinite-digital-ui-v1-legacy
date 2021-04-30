import React, { useState } from 'react';
import { HiddenDiv, FilterDiv, Check } from '../index';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const CheckBox = ({ label, width, options }) => {
  const [open, setOpen] = useState<boolean | undefined>(true);

  const handleChange = () => {
    setOpen(!open);
  };
  return (
    <>
      <FilterDiv onClick={handleChange}>
        <span style={{ color: '#888888', fontSize: '18px' }}>
          {label || 'Enter Label'}
        </span>
        {open ? (
          <KeyboardArrowDownIcon style={{ color: 'black' }} />
        ) : (
          <KeyboardArrowUpIcon style={{ color: 'black' }} />
        )}
      </FilterDiv>
      <HiddenDiv hidden={open} style={{ width: width || '301px' }}>
        {options instanceof Array &&
          options.map((option, index) => {
            return (
              <div key={index} style={{ padding: '6px 16px' }}>
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="start"
                      control={<Check style={{ color: 'black' }} />}
                      label={option}
                      labelPlacement="end"
                      style={{ color: '#9e9e9e' }}
                      color="default"
                    />
                  </FormGroup>
                </FormControl>
              </div>
            );
          })}
      </HiddenDiv>
    </>
  );
};

export default CheckBox;
