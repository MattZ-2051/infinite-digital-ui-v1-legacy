import styled from 'styled-components/macro';
import { ReactComponent as SvgToolTip } from 'assets/svg/icons/tooltip.svg';
import { mediaQueries } from 'theme/media';
import { Link } from 'react-router-dom';
import { ReactComponent as ActionButtonSvg } from 'assets/svg/icons/action-button.svg';
import { Theme } from 'theme/theme';
import Pagination from '@material-ui/lab/Pagination';

export const Container = styled.div`
  padding: 48px 0 48px 48px;
  height: 100%;
  overflow: hidden;
  width: 100%;
  @media screen and (max-width: 1160px) {
    padding: 48px 24px 48px 24px;
  }
`;

export const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 0;

  ${mediaQueries.sm} {
    padding-right: 80px;
  }
`;

export const CancelButton = styled.button`
  height: 40px;
  width: 130px;
  color: white;
  background: #2e2e2e;
  border: none;
  font-size: 16px;
  font-weight: 500;
  border-radius: 35px;
  margin-left: 24px;
  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  :focus {
    outline: none;
  }
`;

export const ActiveAmount = styled.span`
  font-size: 24px;
  color: white;
  font-weight: 600;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

export const ActionButton = styled(ActionButtonSvg)`
  .svg_background {
    fill: #2e2e2e;
  }
  .svg_dots {
    fill: white;
  }
  :hover {
    cursor: pointer;
    .svg_background {
      fill: white;
    }
    .svg_dots {
      fill: #2e2e2e;
    }
  }
`;

export const ActionText = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 400;
  padding-right: 10px;
`;

export const ActiveText = styled.span`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

export const StatusText = styled.span`
  color: #7c7c7c;
  font-size: 16px;
  font-weight: 600;
  padding-right: 5px;
`;

export const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding-right: 0;
  flex-direction: column;

  ${mediaQueries.sm} {
    flex-direction: row;
    padding-right: 80px;
  }
`;

export const TitleLink = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  color: white;
  text-decoration: none;
  :focus {
    color: white;
  }
`;

export const ToolTip = styled(SvgToolTip)`
  position: absolute;
  left: -1em;
  bottom: 45px;
  color: black;
  width: 206px;
  height: 38px;
  :hover {
    cursor: pointer;
  }
`;

export const ToolTipText = styled.span`
  position: absolute;
  left: -1em;
  bottom: 4em;
  color: black;
  overflow: hidden;
  font-size: 14px;
`;

export const ProductId = styled.span`
  font-size: 48px;
  color: white;
  font-weight: 600;
  padding-right: 16px;
`;

export const BidAmount = styled.p`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: white;
`;

export const TransactionHistory = styled.div`
  overflow: hidden;
  height: 80%;
  overflow-x: hidden;
  padding-right: 80px;

  :hover {
    overflow-y: auto;
    cursor: pointer;
  }

  @media screen and (max-width: 1160px) {
    padding-right: 0;
  }
`;

export const BidsHistory = styled.div`
  overflow: hidden;
  height: 80%;
  overflow-x: hidden;

  :hover {
    overflow-y: auto;
    cursor: pointer;
  }

  @media screen and (max-width: 1160px) {
    padding-right: 0;
  }
`;

export const History = styled.span`
  font-size: 16px;
  font-weight: 600;
  border-bottom: 2px solid white;
  padding-bottom: 16px;
`;

export const GrayLine = styled.div<{ width?: boolean; marginRight?: boolean }>`
  border-bottom: 2px solid #2e2e2e;
  color: #1a1a1a;
  padding-bottom: 38px;
  ${(props) => props.marginRight && `margin-right: 80px`};
  ${(props) => props.width && `width: -webkit-fill-available`};
`;

export const Padding = styled.div`
  padding-left: 32px;
  border-bottom: 2px solid #2e2e2e;
`;

export const ProductOwner = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  padding-left: 0;

  ${mediaQueries.sm} {
    flex-direction: row;
    padding-left: 16px;
  }
`;

export const Owner = styled.span`
  color: white;
  margin-left: 0;
  :hover {
    cursor: pointer;
  }

  ${mediaQueries.sm} {
    margin-left: 10px;
  }
`;

export const TextContainer = styled.div<{
  borderBottom?: boolean;
  paddingTop?: string;
}>`
  margin-right: 80px;
  ${(props) => props.borderBottom && `border-bottom: 2px solid #2e2e2e`};
  ${(props) => props.paddingTop && `padding-top: ${props.paddingTop}`};
  display: flex;
  width: 100%;
  align-items: baseline;
  justify-content: flex-end;
`;

export const Text = styled.p<{
  color: string;
  size: string;
  fontWeight: number;
}>`
  margin: 0;
  color: ${(props) => `${props.color}`};
  font-size: ${(props) => `${props.size}`};
  font-weight: ${(props) => `${props.fontWeight}`};
  padding: 0 5px;
`;

export const Button = styled.button<{ width?: string; hover?: boolean }>`
  border: none;
  width: ${(props) => (props.width ? props.width : '190px')};
  height: 40px;
  border-radius: 35px;
  background-color: #2e2e2e;
  color: white;
  font-size: 16px;
  font-weight: 600;
  ${(props) =>
    props.hover
      ? `:hover {
    cursor: pointer;
    background-color: white;
    color: black;
  }`
      : 'color: #9e9e9e;'}
`;

export const Header = styled.div`
  font-size: 48px;
  font-weight: 600;
  color: #7c7c7c;
  display: flex;
  padding-top: 40px;
  justify-content: space-between;
  margin-bottom: 32px;
  align-items: baseline;

  ${mediaQueries.sm} {
    margin-bottom: none;
    align-items: center;
  }
`;

export const Title = styled.div`
  color: #7c7c7c;
  font-size: 16px;
`;

export const Slash = styled.span`
  color: #7c7c7c;
  margin-left: 10px;
  display: none;

  ${mediaQueries.sm} {
    display: inline-block;
  }
`;

export const ButtonContainer = styled.div`
  padding-right: 0;

  ${mediaQueries.sm} {
    padding-right: 80px;
  }
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
  font-weight: 600;
  font-size: 18px;
  line-height: 27.83px;
  color: ${(props) => (props.selected ? 'white' : '#7c7c7c')};
  padding-bottom: 14px;
  border: none;
  border-bottom: ${(props) =>
    props.selected ? '2px solid white' : '2px solid #2e2e2e'};
  position: relative;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

export const BidsContainer = styled.div`
  width: 100%;
  height: 88px;
  padding: 32px 0;
  text-align: center;
  margin-top: 21px;
  font-size: 18px;
  color: white;
  font-weight: 600;
  background: #2e2e2e;
  overflow: hidden;
  @media screen and (max-width: 1160px) {
    padding: 48px 24px 48px 24px;
  }
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
