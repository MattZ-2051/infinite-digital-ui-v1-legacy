import React, { useEffect } from 'react';
import Slider from '@material-ui/core/Slider';

// function valuetext(value) {
//   return `${value}°C`;
// }

export interface IProps {
  handleFilter: (name: string, data: any) => void;
  defaultFilter: number[];
}

const RangeFilter: React.FC<IProps> = ({ handleFilter, defaultFilter }) => {
  const [value, setValue] = React.useState<number[]>([10, 50]);

  useEffect(() => {
    if (defaultFilter.length) {
      return setValue([...defaultFilter]);
    } else {
      return setValue([10, 50]);
    }
  }, [defaultFilter]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleCommit = () => {
    handleFilter('price', [...value]);
  };

  return (
    <div>
      <h4>Price range</h4>
      <Slider
        value={value}
        max={200}
        onChange={handleChange}
        onChangeCommitted={handleCommit}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        // getAriaValueText={valuetext}
      />
    </div>
  );
};

export default RangeFilter;
