import styled from 'styled-components/macro';
import Pagination from '@material-ui/lab/Pagination';
import { ReactComponent as RedeemSvg } from 'assets/svg/icons/redeemable2.svg';

export const Container = styled.div`
  padding: 20px;
  min-width: 400px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

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

export const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

export const RedeemIcon = styled(RedeemSvg)`
  width: 15px;
`;

export const GreyLine = styled.div`
  color: #ebebeb;
  border-bottom: 2px solid #ebebeb;
  width: 100%;
  height: 1px;
`;

export const Text = styled.p<{
  fontWeight: number;
  fontSize: string;
  color: string;
  padding: string;
  textAlign?: string;
}>`
  margin: 0;
  font-weight: ${(props) => `${props.fontWeight}`};
  font-size: ${(props) => `${props.fontSize}`};
  color: ${(props) => `${props.color}`};
  padding: ${(props) => `${props.padding}`};
  text-align: ${(props) => `${props.textAlign}`};
`;

export const FlexDiv = styled.div<{
  justifyContent?: string;
  alignItems?: string;
  padding?: string;
  flexDirection?: string;
}>`
  display: flex;
  justify-content: ${(props) => `${props.justifyContent}`};
  align-items: ${(props) => `${props.alignItems}`};
  padding: ${(props) => `${props.padding};`};
  flex-direction: ${(props) => `${props.flexDirection}`};
`;
