import { useState } from 'react';
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

interface IProps {
  options: string[];
  width?: string;
}

const SortByFilter = ({ width, options }: IProps) => {

  const [isHidden, setIsHidden] = useState<boolean | undefined>(true);
  const [newLabel, setNewLabel] = useState<string | undefined>(options[0]);

  const handleChange = () => {
    setIsHidden(!isHidden);
  }

  const getNewOptions = (el) => {
    return (el !== newLabel)
  }

  options = options.filter(getNewOptions);

  return (
    <>
      <div style={{ display: 'flex', width: '225px', alignItems: 'center' }} onClick={handleChange}  >
        <span style={{ color: '#888888', fontWeight: 500, fontSize: '18px', lineHeight: '22.7px', paddingRight: '8px' }}>Sort by:</span>
        <span style={{ fontWeight: 500, fontSize: '18px', lineHeight: '22.7px' }}>{newLabel}</span>
        {isHidden
          ?
          <DownArrow style={{ color: 'black', fontSize: '35px', marginBottom: '5px' }} />
          :
          <UpArrow style={{ color: 'black', fontSize: '35px', marginBottom: '5px' }} />
        }
      </div>
      <>
        <HiddenDiv hidden={isHidden} style={{ width: width || '301px' }}>
          {options instanceof Array &&
            options.map((option, index) => {
              return (
                <DropDownDiv onClick={() => { setNewLabel(option); setIsHidden(true) }} style={{ height: '38px' }} key={index}>
                  <DropDownSpan >{option}</DropDownSpan>
                </DropDownDiv>
              )
            })}
        </HiddenDiv>
      </>
    </>
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
  background-color: #fafafa;
  color: black;
  overflow-y: auto;
  max-height: 190px;
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
