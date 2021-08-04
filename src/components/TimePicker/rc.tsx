import React from 'react';
import { default as RcTimePicker } from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

const TimePicker = ({ className, ...props }) => {
  return (
    <RcTimePicker
      className={className}
      popupClassName={className}
      {...props}
      showSecond={false}
      // format="HH:mm A"
      use12Hours
      clearIcon={true}
    />
  );
};

export default TimePicker;
