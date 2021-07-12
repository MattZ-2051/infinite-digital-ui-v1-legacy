import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ReactComponent as UsdcSvg } from 'assets/svg/icons/usdc-tx-icon.svg';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

export const Container = styled.div`
  display: grid;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  padding: 20px 0;
  grid-template-columns: 64% 14% 18% 4%;
  @media screen and (max-width: 960px) {
    grid-template-columns: 57% 30% 9%;
  }
`;

export const DownArrow = styled(ExpandMoreIcon)`
  color: #9e9e9e;
  font-size: 24px;
  :hover {
    color: black;
    cursor: pointer;
    transform: sacle(1.1);
  }
`;

export const UpArrow = styled(ExpandLessIcon)`
  color: #9e9e9e;
  font-size: 24px;
  :hover {
    color: black;
    cursor: pointer;
    transform: sacle(1.1);
  }
`;

export const TransactionDetail = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const TransactionDescription = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #9e9e9e;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  padding-left: 5px;
  padding-right: 5px;

  @media screen and (max-width: 960px) {
    display: flex;
    align-items: flex-start;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const Bold = styled.span`
  font-weight: 600;
  padding: 0 5px;
  color: black;
`;

export const Color = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: 600;
`;

export const Icon = styled.img`
  @media screen and (max-width: 960px) {
    padding-top: 5px;
  }
  padding-right: 14px;
`;

export const Date = styled.span`
  color: #9e9e9e;
`;

export const Link = styled(NavLink)`
  margin-left: 3px;
  margin-right: 3px;
  // padding: 0 5px;
  // text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const TxIdContainer = styled.div`
  // padding-left: 55px;
  color: #9e9e9e;
  font-size: 15px;
  font-weight: 400;
  padding-top: 10px;

  @media screen and (max-width: 960px) {
    padding-left: 0;
  }
`;

export const UsdcIcon = styled(UsdcSvg)`
  margin-right: 24px;
`;

export const TxId = styled.span`
  font-weight: 400;
  color: black;
  font-size: 15px;
`;

export const DateContainer = styled.div`
  text-align: start;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media screen and (max-width: 960px) {
    text-align: end;
  }
`;

export const HistoryLine = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-self: center;
  @media screen and (max-width: 600px) {
    width: 73%;
  }
`;
