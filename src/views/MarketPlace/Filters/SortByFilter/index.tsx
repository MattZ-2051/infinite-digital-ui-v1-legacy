import { useState } from 'react';
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useRef } from 'react';


interface IProps {
  options: string[];
  width?: string;
  handleFilter: (name: string, data: any) => void;
  activeFilterSort: string;
}

const SortByFilter = ({ width, options, handleFilter, activeFilterSort }: IProps) => {

  const getCurrentFilterOption = (el) => {
    if (el === activeFilterSort) {
      return el
    } else {
      return 'Release Date'
    }
  }

  let currentLabel = options.filter(getCurrentFilterOption)

  const [isHidden, setIsHidden] = useState<boolean | undefined>(true);
  const [newLabel, setNewLabel] = useState<string | undefined>(currentLabel[0]);
  const selectedItems = useRef<any>([]);

  const handleCheck = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const name = target.children[0].innerHTML;

    if (name) {
      selectedItems.current.push(name);
    } else {
      selectedItems.current = selectedItems.current.filter(
        (item: string) => item !== name
      );
    }
    handleFilter('sort', name);
    setNewLabel(name)
    setIsHidden(true);
  };

  const handleChange = () => {
    setIsHidden(!isHidden);
  }

  const getNewOptions = (el) => {
    return (el !== newLabel)
  }

  options = options.filter(getNewOptions);


  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', width: '225px', alignItems: 'center' }}>
        <span style={{ color: '#888888', fontWeight: 500, fontSize: '18px', lineHeight: '22.7px', paddingRight: '8px' }}>Sort by:</span>
        <span style={{ fontWeight: 500, fontSize: '18px', lineHeight: '22.7px' }}>{newLabel}</span>
        {isHidden
          ?
          <DownArrow style={{ color: 'black', fontSize: '35px', marginBottom: '5px' }} onClick={handleChange} />
          :
          <UpArrow style={{ color: 'black', fontSize: '35px', marginBottom: '5px' }} onClick={handleChange} />
        }
      </div>
      <>
        <HiddenDiv hidden={isHidden} style={{ width: width || '301px' }}>
          {options instanceof Array &&
            options.map((option, index) => {
              return (
                <DropDownDiv onClick={handleCheck} style={{ height: '38px' }} key={index}>
                  <DropDownSpan>{option}</DropDownSpan>
                </DropDownDiv>
              )
            })}
        </HiddenDiv>
      </>
    </div>
  )
}

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


export const FilterContainer = styled.div`
  height: 40px;
  background-color: #fafafa;
  border-radius: 20px;
`;

export const FilterDiv = styled.div`
  display: flex;
  padding: 9px 16px;
  align-items: center;
  justify-content: space-between;
  color: #888888;
  background-color: #fafafa;
  border: none;
  border-radius: 20px;
  :hover {
    cursor: pointer;
    background-color: #D6D6D6;
    border-radius: 20px;
    color: black;
  }
`;

export const HiddenDiv = styled.div`
  background-color: lightblue;
  color: black;
  overflow-y: auto;
  max-height: 190px;
  position: absolute;
`;

export const DropDownSpan = styled.span`
`;

export const DropDownDiv = styled.div`
  padding: 9px 16px;
  border-radius: 20px;
  :hover {
    background-color: #D6D6D6;
    color: white;
    cursor: pointer;
    color: black;
  }
`;

export default SortByFilter;
