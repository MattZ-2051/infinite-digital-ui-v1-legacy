import styled from 'styled-components/macro';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export const Container = styled.div`
  /* display: flex; */
  justify-content: flex-end;
  position: relative;
`;

export const SortBy = styled.span`
  color: #9e9e9e;
  font-weight: 500;
  font-size: 18px;
`;

export const Label = styled.span`
  font-weight: 500;
  font-size: 18px;
  text-align: end;
  margin-left: 8px;
`;

export const HiddenDiv = styled.div`
  width: max-content;
  color: black;
  overflow-y: auto;
  position: absolute;
  background-color: white;
  right: 5%;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  box-shadow: 2px 2px 8px 2px #ccc;
  z-index: 1;
  top: 35px;

  @media screen and (max-width: 960px) {
    top: 113%;
  }
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
