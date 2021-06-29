import styled from 'styled-components/macro';
import CardContent from '@material-ui/core/CardContent';

export const StyledCardContent = styled(CardContent)<{ themeStyle; theme }>`
  background-color: ${({ themeStyle, theme }) =>
    themeStyle === 'dark'
      ? theme.palette.dark.secondaryMain
      : theme.palette.light.secondaryMain};
  color: ${({ themeStyle, theme }) =>
    themeStyle === 'dark'
      ? theme.palette.dark.secondaryComplement
      : theme.palette.light.secondaryComplement};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-top: 21px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 23px;
  height: 100%;
`;

export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  /* margin-right: 24px; */
  /* float: left; */
  flex-direction: column;
  width: fit-content;
  :hover {
    cursor: pointer;
  }
`;

export const ComplementText = styled.span<{ theme; themeStyle }>`
  color: ${({ themeStyle, theme }) =>
    themeStyle === 'dark'
      ? theme.palette.dark.baseComplement
      : theme.palette.light.baseComplement};
`;

export const NotForSale = styled.span`
  font-weight: 700;
  margin: auto;
  font-size: 20px;
  line-height: 32px;
  height: 32px;
`;

export const Upcoming = styled.span`
  font-weight: 700;
  margin: auto;
  font-size: 20px;
  line-height: 32px;
  height: 32px;
`;

export const SerialNum = styled.p`
  display: flex;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0em;
  color: #9e9e9e;
`;

export const Pill = styled.div<{ theme; themeStyle; active: boolean }>`
  background-color: ${({ themeStyle, theme, active }) =>
    themeStyle === 'dark'
      ? active
        ? theme.palette.dark.accentMain
        : theme.palette.dark.accentSecondary
      : active
      ? theme.palette.light.baseComplement
      : theme.palette.light.baseComplement};
  color: ${({ themeStyle, theme, active }) =>
    themeStyle === 'dark'
      ? active
        ? theme.palette.dark.accentComplement
        : theme.palette.dark.secondaryComplement
      : active
      ? theme.palette.light.accentComplement
      : theme.palette.light.secondaryComplement};
  position: relative;
  width: 270px;
  height: 56px;
  border-radius: 35px;
  display: flex;
  align-items: center;
  color: white;
  justify-content: space-between;
  padding: 0 25px;
  bottom: 25px;
`;

export const BottomCardText = styled.p<{ theme; themeStyle }>`
  color: ${({ themeStyle, theme }) =>
    themeStyle === 'dark'
      ? theme.palette.dark.baseComplement
      : theme.palette.light.baseComplement};
  display: flex;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0em;
  text-align: end;
  display: flex;
  align-items: center;
`;

export const AccentCardText = styled(BottomCardText)<{ theme; themeStyle }>`
  color: ${({ themeStyle, theme }) =>
    themeStyle === 'dark'
      ? theme.palette.dark.darkGreyText
      : theme.palette.light.baseComplement};
  margin: 0;
  margin-top: 21px;
  margin-bottom: 21px;
`;

export const SkuName = styled.p`
  font-size: 26px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0em;
  margin: 0;
  margin-top: 16px;
  height: 64px;
`;

export const IssuerName = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 20.24px;
  color: #9e9e9e;
  margin: 0;
`;
