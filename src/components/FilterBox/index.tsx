import styled from 'styled-components/macro';
import React, { useState } from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import RangeSlider from 'components/RangeSlider';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


export interface IProps {
  type: string;
  label: string;
  options?: string[];
  width?: string;
}



const FilterBox = ({ label, type, options, width }: IProps) => {

  const [open, setOpen] = useState<boolean | undefined>(true);

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleChange = () => {
    setOpen(!open);
  }

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <FilterContainer style={{ width: width || '301px' }}>
      {type === 'dropdown' && (
        <>
          <FilterDiv onClick={handleChange}  >
            <span style={{ color: '#888888', }}>{label || "Enter Label"}</span>
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
      )}
      {type === 'date' && (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePickers
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            onChange={handleDateChange}
            value={selectedDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            style={{ WebkitAppearance: 'none' }}

          />
        </MuiPickersUtilsProvider>
      )}
      {type === 'checkbox' && (
        <>
          <FilterDiv onClick={handleChange}  >
            <span style={{ color: '#888888', }}>{label || "Enter Label"}</span>
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
                  <div style={{ padding: '6px 16px' }}>
                    <FormControl component="fieldset">
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value="start"
                          control={<Check style={{ color: 'black' }} />}
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

        </>
      )}
      {type === 'range' && (
        <>
          <RangeSlider />
        </>
      )}
      {type === 'sort' && (
        <>
          <div style={{ display: 'flex', width: '225px', alignItems: 'center' }} onClick={handleChange}  >
            <span style={{ color: '#888888', fontWeight: 500, fontSize: '18px', lineHeight: '22.7px', paddingRight: '8px' }}>Sort by:</span>
            <span style={{ fontWeight: 500, fontSize: '18px', lineHeight: '22.7px' }}>Most Popular</span>
            {open
              ?
              <KeyboardArrowDownIcon style={{ color: 'black', fontSize: '40px', marginBottom: '5px' }} />
              :
              <KeyboardArrowUpIcon style={{ color: 'black', fontSize: '40px', marginBottom: '5px' }} />
            }
          </div>
          {/* <HiddenDiv hidden={open} style={{ width: width || '301px' }}>
            {options instanceof Array &&
              options.map((option, index) => {
                return (
                  <DropDownDiv style={{ height: '38px' }} key={index}>
                    <DropDownSpan>{option}</DropDownSpan>
                  </DropDownDiv>
                )
              })}
          </HiddenDiv> */}
        </>
      )}

    </FilterContainer>
  )
}

const FilterContainer = styled.div`
  height: 40px;
  background-color: #fafafa;
  border-radius: 20px;

`;

const Check = styled(Checkbox)`
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

const FilterDiv = styled.div`
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
    background-color: #c4c4c4;
    border-radius: 20px;
    color: black;
  }
`;

const HiddenDiv = styled.div`
  background-color: #fafafa;
  color: black;
  overflow-y: auto;
  max-height: 190px;
`;

const DropDownSpan = styled.span`
`;

const DropDownDiv = styled.div`
  padding: 9px 16px;
  border-radius: 20px;
  :hover {
    background-color: #c4c4c4;
    color: white;
    cursor: pointer;
    color: black;
  }
`;

const DatePickers = styled(KeyboardDatePicker)`
  .MuiPickersDay-daySelected {
    background-color: black;
  }
`;

export default FilterBox
