import styled from 'styled-components/macro';
import Pagination from '@material-ui/lab/Pagination';
import { Theme } from 'theme/theme';

export const StyledPagination = styled(Pagination) <{ theme; themeStyle }>`
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

export const PaginationContainer = styled.div`
  display: flex;
  @media screen and (min-width: 1369px) {
    justify-content: flex-end;
    margin-right: 9vh;
  }
  @media screen and (max-width: 1369px) {
    justify-content: center;
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

  // min-height: 70vh;
  @media screen and (min-width: 1440px) {
    width: 1440px;
  }
  padding: 40px;
`;

export const GrayLine = styled.div`
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 14px;
`;

export const TabBar = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContainerForBigScreen = styled.div<{
  screenWidth: number;
  backgroundColor: string;
}>`
  @media screen and (min-width: 1440px) {
    width: ${({ screenWidth }) => screenWidth}px;
    margin-left: ${({ screenWidth }) => -(screenWidth - 1440) / 2}px;
    background-color: ${(props) => `${props.backgroundColor}`};
    display: flex;
    justify-content: center;
  }
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
