import styled from 'styled-components/macro';
import { ReactComponent as SvgToolTip } from 'assets/svg/icons/tooltip.svg';
import { mediaQueries } from 'theme/media';
import { Link } from 'react-router-dom';

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
  padding-right: 80px;
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

export const History = styled.span`
  font-size: 16px;
  font-weight: 600;
  border-bottom: 2px solid white;
  padding-bottom: 16px;
`;

export const GrayLine = styled.div`
  border-bottom: 2px solid #2e2e2e;
  width: 100%;
  color: #1a1a1a;
  padding-bottom: 16px;
  padding-right: 80px;
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
      : 'color: #9e9e9e'}
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
