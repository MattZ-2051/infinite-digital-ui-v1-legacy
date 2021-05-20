import styled from 'styled-components/macro';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: black;
  padding-bottom: 20px;
  border-bottom: 2px solid #ebebeb;
  @media screen and (max-width: 960px) {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

export const DownArrow = styled(KeyboardArrowDownIcon)`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const UpArrow = styled(KeyboardArrowUpIcon)`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const ToggleArrow = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
`;
