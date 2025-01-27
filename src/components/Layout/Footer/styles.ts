import styled from 'styled-components/macro';
import { ReactComponent as ToolTip } from 'assets/svg/icons/tooltip-large.svg';

export const StyledFooter = styled.footer<{
  padding: string;
  backgroundColor: string;
}>`
  position: relative;
  bottom: 0;
  width: 100%;
  background-color: ${(props) => `${props.backgroundColor}`};
  border-top: ${(props) =>
    props.backgroundColor === '#ddf874' && '1px solid #C7DF67'};
  padding: ${(props) => props.padding};
`;

export const CopyRightDiv = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  flex: 1;
  color: ${(props) => `${props.color}`};
`;

export const HederaText = styled.div<{ footerTheme: string }>`
  @media screen and (max-width: 602px) {
    margin-left: 27px;
  }
  ${(props) =>
    props.footerTheme === 'green' &&
    `  color: black;
  opacity: 0.48;
  :hover {
    opacity: 1;
    cursor: pointer;
  }`};
`;
export const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: auto;
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
  padding: 24px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
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

export const TextButtonContainer = styled.div<{ matchesMobile }>`
  ${(props) =>
    props.matchesMobile
      ? `
          width:100%;
          margin-bottom:20px;
           display: flex;
          justify-content: space-between;
          align-items: flex-start;
          `
      : ''};
`;
