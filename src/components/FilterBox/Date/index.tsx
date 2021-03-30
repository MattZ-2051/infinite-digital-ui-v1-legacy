import React, { useState } from 'react';
import { DatePickers } from '../index';
import {
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  return (
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
  )
}

export default DatePicker;
