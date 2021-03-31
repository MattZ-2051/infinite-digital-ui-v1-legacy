import React, { useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

// function valuetext(value) {
//   return `${value}°C`;
// }

export interface IProps {
  handleFilter: (name: string, data: any) => void;
  defaultFilter: number[];
}

const RangeFilter: React.FC<IProps> = ({ handleFilter, defaultFilter }) => {
  const [value, setValue] = React.useState<number[]>([0, 1000]);
  const [isHidden, setIsHidden] = React.useState<boolean | undefined>(true);

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

  const handleOpen = () => {
    setIsHidden(!isHidden)
  }
  const handleCommit = () => {
    handleFilter('price', [...value]);
  };

  return (
    <div style={{ width: '301px', padding: '9px 16px' }}>
      <Typography id="range-slider" gutterBottom >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={handleOpen}>
          <span style={{ fontSize: '18px', fontWeight: 500, color: '#9E9E9E' }}>Price Range</span>
          <span style={{ color: 'black', fontSize: '14px' }}>From ${value[0]} to ${value[1]}</span>
          {isHidden ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </div>
      </Typography>
      <div hidden={isHidden}>
        <StyledSlider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          max={1000}
          min={0}
          onChangeCommitted={handleCommit}
        />
      </div>
    </div>
  );
};

const StyledSlider = styled(Slider)`
  .MuiSlider-root {
    color: black;
  }
  .MuiSlider-thumb {
    border: 2px solid black;
    color: white;
    width: 15px;
    height: 15px;
    box-shadow: none;
  }

  .MuiSlider-thumb:hover {
    color: black;
    box-shadow: 0px 0px 0px 8px rgb(0 0 0 / 16%);
  }

  .MuiSlider-track {
    color: black;
  }

  .MuiSlider-rail {
    background-color: black;
  }

  .MuiSlider-valueLabel	{
    color: black;
  }

  .Mui-focusVisible	{
    color: black;
  }
`;

export default RangeFilter;
