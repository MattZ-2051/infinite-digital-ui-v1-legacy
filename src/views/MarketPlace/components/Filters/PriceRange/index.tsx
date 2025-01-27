import React, { useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export interface IProps {
  handleFilter: (name: string, data: any) => void;
  defaultFilter: number[];
  maxValue?: number;
}

const RangeFilter = ({
  handleFilter,
  defaultFilter,
  maxValue = 20000,
}: IProps) => {
  const [value, setValue] = React.useState<number[]>([0, maxValue || 20000]);
  const [isHidden, setIsHidden] = React.useState<boolean | undefined>(true);

  useEffect(() => {
    if (defaultFilter.length) {
      return setValue([...defaultFilter]);
    }
    setValue([0, maxValue]);
  }, [defaultFilter, maxValue]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleOpen = () => {
    setIsHidden(!isHidden);
  };
  const handleCommit = () => {
    handleFilter('price', [...value]);
  };

  return (
    <div style={{ width: '320px', marginLeft: '-10px' }}>
      <Typography id="range-slider" gutterBottom>
        <SliderContainer onClick={handleOpen}>
          <span style={{ fontSize: '18px', fontWeight: 500, color: '#9E9E9E' }}>
            Price Range
          </span>
          <span style={{ color: 'black', fontSize: '14px' }}>
            From ${value[0] || 0} to ${value[1] || maxValue}
          </span>
          {isHidden ? <DownArrow /> : <UpArrow />}
        </SliderContainer>
      </Typography>
      <div hidden={isHidden}>
        <StyledSlider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          max={maxValue > value[1] ? maxValue : value[1]}
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

  .MuiSlider-valueLabel {
    color: black;
  }

  .Mui-focusVisible {
    color: black;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  :hover {
    cursor: pointer;
    background-color: #f4f4f4;
    border-radius: 20px;
    color: black;
  }
`;

const DownArrow = styled(KeyboardArrowDownIcon)`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const UpArrow = styled(KeyboardArrowUpIcon)`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export default RangeFilter;
