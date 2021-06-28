import Card from '@material-ui/core/Card';
import styled from 'styled-components/macro';
import Title from './Tile';

export const StyledCard = styled(Card)<{ themeStyle; theme }>`
  background-color: ${({ themeStyle, theme }) =>
    themeStyle === 'dark'
      ? theme.palette.dark.secondaryMain
      : theme.palette.light.baseMain};
  /* TODO: min/max width? */
  max-width: 302px;
  min-width: 302px;
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  height: 100%;
  border-style: solid;
  border-color: ${({ themeStyle }) =>
    themeStyle === 'dark' ? 'none' : '#ededed'};
  border-width: 1px;
  box-shadow: none;
`;

export const StyledCardDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  paddingtop: 8px;
`;

export const CardImg = styled.img`
  height: 240px;
  width: 302px;
  border-radius: 20px 20px 0 0;
  object-fit: cover;
`;

export const RedeemIcon = styled.img`
  position: absolute;
  width: 40px;
  right: 0.6%;
  top: 0.6%;
`;

export default Title;
