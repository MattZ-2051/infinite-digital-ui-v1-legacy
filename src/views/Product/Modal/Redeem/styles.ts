import styled from 'styled-components/macro';
import { ReactComponent as Redeemable } from 'assets/svg/icons/redeemable2.svg';

export const Container = styled.div`
  padding: 20px;
  width: 410px;
  @media screen and (max-width: 960px) {
    width: 100%;
    height: 100vh;
    padding: 40px 0;
  }
`;

export const RedeemIcon = styled(Redeemable)`
  margin-right: 5px;
`;
export const Header = styled.p`
  font-size: 22px;
  font-weight: 600;
  margin: 0;
  padding-left: 10px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 24px;
  border-bottom: 1px solid #ebebeb;
`;
export const CloseButton = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

export const SubHeaderContainer = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid #ebebeb;
`;

export const RowFlex = styled.div<{ padding: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: fit-content;
  padding: ${(props) => `${props.padding}`};
`;

export const Slash = styled.span<{ padding: string }>`
  padding: ${(props) => `${props.padding}`};
`;

export const IssuerName = styled.p`
  margin: 0;
  font-size: 15px;
  color: #9e9e9e;
  font-weight: 400;
`;

export const SkuName = styled.p`
  margin: 0;
  font-size: 20px;
  color: black;
  font-weight: 600;
  padding-bottom: 10px;
`;

export const SeriesName = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 400;
`;

export const Serial = styled.p`
  margin: 0;
  font-size: 15px;
  color: #9e9e9e;
`;

export const SerialNum = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 400;
`;
