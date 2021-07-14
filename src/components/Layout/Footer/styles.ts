import styled from 'styled-components';
import { ReactComponent as ToolTip } from 'assets/svg/icons/tooltip-large.svg';

export const StyledFooter = styled.footer`
  position: relative;
  bottom: 0;
  width: 100%;
  background-color: black;
  padding: 0 80px;
`;

export const HederaText = styled.div`
  @media screen and (max-width: 602px) {
    margin-left: 27px;
  }
`;
export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: auto;
  padding: 17px 80px;
  font-size: 12px;
  color: white;
  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: row;
    padding: 10px 30px;
    font-size: 12px;
    color: white;
  }
`;

export const FooterBottom = styled.div`
  padding: 8px 0 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 960px) {
    display: grid;
    justify-content: center;
    grid-gap: 20px;
    margin: auto;
  }
`;

export const StyledToolTip = styled(ToolTip)`
  position: absolute;
  bottom: -15px;
  color: black;
  left: 16px;
  transform: translate(-50%, -50%);
  :hover {
    cursor: pointer;
  }
`;

export const ToolTipText = styled.span`
  position: absolute;
  bottom: 40px;
  left: 16px;
  color: black;
  overflow: hidden;
  font-size: 14px;
  transform: translate(-50%, -50%);
  a {
    font-weight: normal;
  }
`;

export const ShowLinkDiv = styled.div`
  position: relative;
  width: 363px;
  @media screen and (max-width: 600px) {
    width: 0;
  }
`;
