import styled from 'styled-components/macro';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export const DownArrow = styled(KeyboardArrowDownIcon)`
  color: black;
  font-size: 30px;
  margin-bottom: 5px;
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const UpArrow = styled(KeyboardArrowUpIcon)`
  color: black;
  font-size: 30px;
  margin-bottom: 5px;
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;
