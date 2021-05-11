import Card from '@material-ui/core/Card';
import styled from 'styled-components/macro';
import CardMedia from '@material-ui/core/CardMedia';
import Title from './Tile';

export const StyledCard = styled(Card)<{ themeStyle; theme }>`
  background-color: ${({ themeStyle, theme }) =>
    themeStyle === 'dark'
      ? theme.palette.dark.baseMain
      : theme.palette.light.baseMain};
  background-color: black;
  /* TODO: min/max width? */
  max-width: 302px;
  min-width: 302px;
  overflow: hidden;
  border-radius: 20px;
  position: relative;
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
  right: 5%;
  top: 2%;
`;

export default Title;
