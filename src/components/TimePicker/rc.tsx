import React from 'react';
import { default as RcTimePicker } from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

const TimePicker = (props) => {
  return (
    <RcTimePicker
      {...props}
      showSecond={false}
      // format="HH:mm A"
      use12Hours
    />
  );
};

export default TimePicker;
