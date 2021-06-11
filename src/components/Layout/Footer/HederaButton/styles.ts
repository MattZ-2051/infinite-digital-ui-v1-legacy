import styled from 'styled-components';
import { ReactComponent as ToolTip } from 'assets/svg/icons/tooltip-large.svg';

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
  @media screen and (max-width: 600px) {
    width: 0;
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
