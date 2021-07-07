import styled from 'styled-components/macro';
// Icons
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { ReactComponent as RedeemSvg } from 'assets/svg/icons/redeemable2.svg';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export const Body = styled.div`
  color: black;
  padding: 34px;
`;

export const Container = styled.div`
  background-color: white;
  overflow: hidden;
  height: 100vh;
  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 1160px) {
    height: auto;
  }
`;

export const Description = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  font-weight: 600;
  margin: 0;
  padding-top: 32px;
`;

export const SkuSeries = styled.span`
  font-size: 18px;
`;

export const RedeemIcon = styled(RedeemSvg)`
  margin-right: 10px;
`;

export const SkuName = styled.p`
  font-size: 36px;
  font-weight: 600;
  margin: 0;
  padding: 16px 0;
  max-height: 130px;
`;

export const SkuInfo = styled.span<{ color?: string; hover?: boolean }>`
  font-size: 16px;
  color: ${(props) => `${props.color}`};
  margin-right: 10px;
  margin: 0;
  padding-top: 16px;
  ${(props) =>
    props.hover
      ? `:hover {
    cursor: pointer;
    border-bottom: 1px solid black;
    transform: scale(1.1);
  }`
      : ``};
`;

export const Issuer = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #7c7c7c;
`;

export const Flex = styled.div<{
  justifyContent?: string;
  alignItems?: string;
}>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;

export const GreyLine = styled.div`
  border-bottom: 2px solid #ebebeb;
  width: 100%;
  padding-top: 16px;
`;

export const DescriptionText = styled.p`
  padding-top: 24px;
  color: #9e9e9e;
  font-size: 16px;
  margin: 0;
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

export const ShowDescription = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
`;

export const Footer = styled.div`
  padding-top: 20px;
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
  span {
    vertical-align: top;
  }
`;

export const BackArrow = styled(ArrowBackIosIcon)`
  font-size: 20px;
  margin-right: 10px;
`;

export const TokenExplorerLink = styled.a`
  display: flex;
  margin-left: 7px;
  align-items: flex-end;
`;

export const TokenExplorerLinkPlain = styled.div`
  display: flex;
  margin-left: 7px;
  align-items: flex-end;
`;
