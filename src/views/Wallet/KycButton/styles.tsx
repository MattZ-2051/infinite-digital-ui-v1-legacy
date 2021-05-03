import styled from 'styled-components/macro';
import MuiBlockIcon from '@material-ui/icons/Block';
import MuiVerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import MuiVerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MuiArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export const Container = styled.div`
  color: #9e9e9e;
  display: flex;
  align-items: center;
  margin-top: 10px;

  .extraClass {
    pointer-events: auto !important;
    &:hover {
      visibility: visible !important;
      opacity: 1 !important;
    }
  }
`;

export const BlockIcon = styled(MuiBlockIcon)`
  transition: 0.2s;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    color: black;
  }
`;

export const LevelIndicator = styled.span`
  font-weight: 600;
  color: black;
  margin-left: 10px;
  padding-top: 4px;
`;

export const StatusText = styled.span`
  margin-left: 10px;
  padding-top: 4px;
`;

export const VerifiedUserOutlinedIcon = styled(MuiVerifiedUserOutlinedIcon)`
  color: black;
`;

export const VerifiedUserIcon = styled(MuiVerifiedUserIcon)`
  color: black;
`;

export const ArrowDropDownIcon = styled(MuiArrowDropDownIcon)`
  transition: 0.2s;
  position: absolute;
  top: 21px;
  color: black;
`;

export const LearnMore = styled.a`
  color: white;
  text-decoration: none;
  cursor: pointer;
`;
