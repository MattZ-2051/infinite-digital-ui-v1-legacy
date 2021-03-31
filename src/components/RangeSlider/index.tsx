import React from 'react';


// function valuetext(value: number) {
//   return `${value}°C`;
// }

export default function RangeSlider({ onChangeCommittedFunc }) {
  const [value, setValue] = React.useState<number[]>([0, 1000]);
  const [open, setOpen] = React.useState<boolean | undefined>(true);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <div></div>
  );
}
