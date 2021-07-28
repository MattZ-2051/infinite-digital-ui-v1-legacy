import styled from 'styled-components/macro';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Theme } from 'theme/theme';

export const DownArrow = styled(KeyboardArrowDownIcon) <{ theme?: Theme, themeStyle?: 'dark' | 'light' }>`
   color: ${(props) =>
    props.themeStyle === 'dark'
      ? props.theme.palette.light.baseMain
      : props.theme.palette.dark.baseMain};
  font-size: 30px;
  margin-bottom: 5px;
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

export const UpArrow = styled(KeyboardArrowUpIcon) <{ theme?: Theme, themeStyle?: 'dark' | 'light' }>`
  color: ${(props) =>
    props.themeStyle === 'dark'
      ? props.theme.palette.light.baseMain
      : props.theme.palette.dark.baseMain};
  font-size: 30px;
  margin-bottom: 5px;
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;
