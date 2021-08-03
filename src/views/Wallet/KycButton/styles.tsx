import styled from 'styled-components/macro';
import Button from 'components/Buttons';

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

export const BlockIcon = styled.img`
  cursor: pointer;
`;

export const LevelIndicator = styled.span`
  font-weight: 700;
  color: black;
  margin-left: 10px;
  font-size: 16px;
`;

export const StatusText = styled.span`
  margin-left: 7px;
  font-weight: 700;
  font-size: 16px;
  color: #9e9e9e;
  font-style: Medium;
`;

export const InfoText = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: #9e9e9e;
`;

export const VerifiedUserKycIcon = styled.img``;
export const PendingVerification = styled.img``;
export const ArrowRight = styled.img``;

export const VerifyButton = styled(Button)`
  padding: 10px 25px 10px 25px !important;
  margin-left: 20px;
  font-weight: 700 !important;
  font-size: 16px;
`;

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const Content = styled.div``;

export const SecondaryContent = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin-bottom: 10px;
`;
