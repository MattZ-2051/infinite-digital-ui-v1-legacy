import styled from 'styled-components/macro';
import { ReactComponent as TransferSvg } from 'assets/svg/icons/transfer-icon.svg';
import { ReactComponent as AuctionSvg } from 'assets/svg/icons/auction-icon.svg';
import { ReactComponent as SellSvg } from 'assets/svg/icons/sell-icon.svg';
import { ReactComponent as RedeemSvg } from 'assets/svg/icons/redeemable2.svg';
import { ReactComponent as IsRedeemedSvg } from 'assets/svg/icons/is-redeemed-icon.svg';

export const Container = styled.div`
  position: absolute;
  background-color: #252525;
  top: 30px;
  right: 0;
  border-radius: 20px;
  display: flex;
  flex-direction: column:
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

export const Button = styled.div<{ hover: boolean }>`
  padding: 9px;
  margin: 0;
  border-radius: 35px;
  height: 42px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #7c7c7c;
  ${(props) =>
    props.hover &&
    `:hover {
    background-color: #3a3a3a;
    cursor: pointer;
    color: white;}`};

  :hover .icon_redeem,
  :hover .icon_sell,
  :hover .icon_auction,
  :hover .icon_transfer {
    stroke: white;
    fill: white;
  }

  :hover .icon_isRedeemed {
    stroke: #3a3a3a;
    fill: #3a3a3a;
  }
`;

export const ButtonContainer = styled.div`
  padding: 10px 5px;
`;

export const Label = styled.span`
  padding-left: 10px;
  font-size: 16px;
  font-weight: 600;
`;

export const TransferIcon = styled(TransferSvg)`
  fill: none;
  stroke: #7c7c7c;
  margin-right: 10px;
`;

export const AuctionIcon = styled(AuctionSvg)`
  fill: #7c7c7c;
  stroke: #7c7c7c;
  margin-right: 10px;
`;

export const SellIcon = styled(SellSvg)`
  fill: #7c7c7c;
  stroke: #7c7c7c;
  margin-right: 10px;
`;

export const RedeemIcon = styled(RedeemSvg)`
  fill: #7c7c7c;
  stroke: #7c7c7c;
  margin-right: 13px;
`;

export const IsRedeemedIcon = styled(IsRedeemedSvg)`
  fill: #3a3a3a;
  stroke: #3a3a3a;
  margin-right: 10px;
`;
