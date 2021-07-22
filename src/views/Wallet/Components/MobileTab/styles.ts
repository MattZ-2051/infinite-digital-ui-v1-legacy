import styled from 'styled-components/macro';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ITabOptions } from '../tabOptions/ITabOptions';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
export const TextAndArrowContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const DownArrow = styled(KeyboardArrowDownIcon)`
  color: black;
  font-size: 30px;
  margin-top: 5px;
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const UpArrow = styled(KeyboardArrowUpIcon)`
  color: black;
  font-size: 30px;
  margin-top: 5px;
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const SortBy = styled.span`
  color: #9e9e9e;
  font-weight: 500;
  font-size: 18px;
  padding-right: 8px;
`;

export const Label = styled.span`
  font-weight: 700;
  font-size: 18px;
  text-align: start;
  width: max-content;
`;

export const HiddenDiv = styled.div`
  width: max-content;
  color: black;
  overflow-y: auto;
  position: absolute;
  background-color: white;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  box-shadow: 2px 2px 8px 2px #ccc;
  z-index: 1;
  top: 50px;
  left: -3px;
`;

export const DropDownDiv = styled.div`
  padding: 9px 16px;
  border-radius: 20px;
  color: #9e9e9e;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  :hover {
    background-color: #d6d6d6;
    color: white;
    cursor: pointer;
    color: black;
  }
`;
