import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ReactComponent as UsdcSvg } from 'assets/svg/icons/usdc-tx-icon.svg';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 68% 15% 12% 5%;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  padding: 20px 0;
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
  text-align: center;
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
  padding-right: 24px;
`;

export const Date = styled.span`
  color: #9e9e9e;
`;

export const Link = styled(NavLink)`
  padding: 0 5px;
  text-align: center;
`;

export const TxIdContainer = styled.div`
  padding-left: 55px;
  color: #9e9e9e;
  font-size: 15px;
  font-weight: 400;
  padding-top: 10px;
`;

export const UsdcIcon = styled(UsdcSvg)`
  margin-right: 24px;
`;

export const TxId = styled.span`
  font-weight: 400;
  color: black;
  font-size: 15px;
`;
