import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import times from '../../assets/svg/icons/times.svg';
import check from '../../assets/svg/icons/check.svg';

interface ICustomDropdownProps<T> {
  elemToKey: (a: T) => string;
  elemToLabel: (a: T) => string;
  onChange: (a: T | null) => void;
  value: T | null;
  placeholder?: string;
  options: T[];
  showValidations: boolean;
  errorMsg?: string;
}

const DUMMY_EMPTY_VALUE = 'empty';

export default function CustomDropdown<T>({
  showValidations,
  errorMsg,
  elemToKey,
  elemToLabel,
  value: valueIn,
  onChange,
  placeholder,
  options,
  ...props
}: ICustomDropdownProps<T>) {
  const optionKeys = options.map(elemToKey);
  const hasError = Boolean(errorMsg);
  useEffect(() => {
    if (valueIn && !options.includes(valueIn)) {
      onChange(null);
    }
  }, [options, valueIn]);
  const findFromOptions = (inVal) => {
    const selected = options.find((item) => elemToKey(item) === inVal);
    return selected || null;
  };
  return (
    <TextField
      select
      helperText={showValidations && errorMsg}
      error={showValidations && hasError}
      value={
        valueIn && optionKeys.includes(elemToKey(valueIn))
          ? elemToKey(valueIn)
          : DUMMY_EMPTY_VALUE
      }
      defaultValue={DUMMY_EMPTY_VALUE}
      onChange={(event) => {
        onChange(findFromOptions(event.target.value));
      }}
      inputProps={{
        displayEmpty: true,
        renderValue: placeholder
          ? (value) => {
              if (value === DUMMY_EMPTY_VALUE) {
                return (
                  <span
                    style={{
                      color: showValidations && hasError ? 'red' : '#848484',
                    }}
                  >
                    {placeholder}
                  </span>
                );
              }
              const found = findFromOptions(value as string);
              return <span>{found ? elemToLabel(found) : placeholder}</span>;
            }
          : undefined,
        endAdornment: (
          <InputAdornment position="end">
            {showValidations ? (
              <img src={hasError ? times : check} alt="validationStatus" />
            ) : (
              <></>
            )}
          </InputAdornment>
        ),
      }}
      {...props}
    >
      {placeholder && (
        <MenuItem
          style={{ display: 'none' }}
          disabled
          value={DUMMY_EMPTY_VALUE}
        />
      )}
      {options.map((el) => {
        const kk = elemToKey(el);
        return (
          <MenuItem key={kk} value={kk}>
            {elemToLabel(el)}
          </MenuItem>
        );
      })}
    </TextField>
  );
}
