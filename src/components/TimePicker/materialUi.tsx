import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

const TimePicker = (props) => {
  return (
    <TextField
      {...props}
      type="time"
      min="12:00"
      max="18:00"
      onChange={(e) =>
        props.onChange(
          e.target.value ? moment(`1990-01-01T${e.target.value}:00.000Z`) : null
        )
      }
      value={props.value ? props.value.format('HH:mm') : ''}
      defaultValue={
        props.defaultValue ? props.defaultValue.format('HH:mm') : ''
      }
      pattern="[0-9]{2}:[0-9]{2}"
    />
  );
};

export default TimePicker;
