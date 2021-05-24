import styled from 'styled-components/macro';
import Pagination from '@material-ui/lab/Pagination';
import { Theme } from 'theme/theme';

export const StyledPagination = styled(Pagination)<{ theme; themeStyle }>`
  .MuiButtonBase-root.MuiPaginationItem-page.Mui-selected {
    background-color: ${({ themeStyle, theme }) =>
      themeStyle === 'dark'
        ? theme.palette.light.baseMain
        : theme.palette.dark.baseMain};

    color: ${({ themeStyle, theme }) =>
      themeStyle === 'dark'
        ? theme.palette.dark.baseMain
        : theme.palette.light.baseMain};
    &:hover {
    }
  }
  .MuiButtonBase-root.MuiPaginationItem-root {
    background-color: ${({ themeStyle, theme }) =>
      themeStyle === 'dark' ? theme.palette.dark.baseMain : 'inherit'};
    color: ${({ themeStyle, theme }) =>
      themeStyle === 'dark' ? theme.palette.light.baseMain : 'inherit'};
  }
  .MuiPaginationItem-ellipsis {
    color: ${({ themeStyle, theme }) =>
      themeStyle === 'dark' ? theme.palette.light.baseMain : 'inherit'};
  }
`;

export const Container = styled.div<{ theme; themeStyle?: 'light' | 'dark' }>`
  background-color: ${({ themeStyle, theme }) =>
    themeStyle === 'dark'
      ? theme.palette.dark.baseMain
      : theme.palette.light.baseMain};
  color: ${({ themeStyle, theme }) =>
    themeStyle === 'dark'
      ? theme.palette.dark.baseComplement
      : theme.palette.light.baseComplement};
  width: 100%;
  padding: 40px;
`;

export const GrayLine = styled.div`
  border-bottom: 2px solid #d8d8d8;
  width: 80%;
  padding-bottom: 14px;
`;

export const TabBar = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Tab = styled.div<{
  selected: boolean;
  theme: Theme;
  themeStyle?: 'light' | 'dark';
}>`
  background-color: ${({ themeStyle, theme }) =>
    themeStyle === 'dark'
      ? theme.palette.dark.baseMain
      : theme.palette.light.baseMain};
  color: ${({ themeStyle, theme, selected }) =>
    themeStyle === 'dark'
      ? selected
        ? theme.palette.dark.baseComplement
        : theme.palette.dark.greyText
      : selected
      ? theme.palette.light.baseComplement
      : theme.palette.light.greyText};
  border-bottom: ${({ themeStyle, theme, selected }) =>
    selected
      ? themeStyle === 'dark'
        ? '2px solid ' + theme.palette.dark.baseComplement
        : '2px solid ' + theme.palette.light.baseComplement
      : 'none'};
  font-weight: 600;
  font-size: 22px;
  line-height: 27.83px;
  padding-bottom: 14px;
  border: none;
  position: relative;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;
