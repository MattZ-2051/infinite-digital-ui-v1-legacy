import styled from 'styled-components/macro';
import { ReactComponent as linkSVG } from 'assets/svg/icons/link-icon.svg';
import { ReactComponent as SvgToolTip } from 'assets/svg/icons/tooltip.svg';

export const Container = styled.div`
  border-top: 1px solid #2e2e2e;
  border-bottom: 1px solid #2e2e2e;
  padding: 32px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  :hover {
    border-bottom: 1px solid white;
  }
  :hover .username {
    color: white;
  }
`;

export const UsernameTypeMint = styled.span`
  color: white;
  font-weight: 600;
  font-size: 16px;
  padding-left: 10px;
`;

export const ToolTip = styled(SvgToolTip)`
  position: absolute;
  bottom: 30px;
  color: black;
  right: -3.7em;
  width: 160px;
  :hover {
    cursor: pointer;
  }
  @media screen and (max-width: 1160px) {
    position: absolute;
    bottom: 30px;
    color: black;
    right: 0;
    :hover {
      cursor: pointer;
    }
  }
`;

export const ToolTipText = styled.span`
  position: absolute;
  bottom: 3em;
  color: black;
  width: 175px;
  overflow: hidden;
  font-size: 14px;
  left: -4.5em;
  text-align: center;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
  a {
    font-weight: 400;
  }

  @media screen and (max-width: 960px) {
    position: absolute;
  bottom: 3.5em;
  color: black;
  width: 95px;
  overflow: hidden;
  font-size: 12px;
  left: -6em;

  text-align: center;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
  a {
    font-weight: 400;
  }
`;

export const Link = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: black;
  height: 40px;
  width: 190px;
  position: absolute;
  bottom: 30px;
  border-radius: 35px;
  overflow: hidden;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const TransactionInfo = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const TransactionDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
  justify-content: center;
  align-items: flex-start;
`;

export const LinkIcon = styled(linkSVG)`
  width: 40px;
  stroke: #9e9e9e;
  fill: none;
  :hover {
    stroke: white;
    cursor: pointer;
  }
`;

export const Description = styled.span`
  color: #9e9e9e;
  font-weight: 600;
  font-size: 16px;
  padding-right: 10px;
`;

export const FlexDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

export const Amount = styled.span`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

export const Date = styled.span`
  font-size: 13px;
  color: #9e9e9e;
`;

export const Username = styled.p`
  font-size: 16px;
  margin: 0;
  width: 80px;
  color: #9e9e9e;
  :hover {
    cursor: pointer;
    color: white;
  }
`;
