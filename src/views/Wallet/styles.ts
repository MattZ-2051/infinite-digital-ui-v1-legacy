import styled from 'styled-components/macro';
import { Link as RouterLink } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export const Container = styled.div<{ showMore: boolean }>`
  min-height: 0vh;
`;

export const Header = styled.div`
  background-color: black;
  height: 25%;
  @media screen and (max-width: 960px) {
    padding: 24px;
  }
`;

export const HeaderContent = styled.div`
  background-color: black;
  height: 25%;
  color: white;
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  padding: 48px;
  justify-content: flex-end;
  margin: 0 auto;
  @media screen and (max-width: 960px) {
    padding: 24px;
  }
`;

export const Main = styled.div`
  height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
  @media screen and (max-width: 960px) {
    grid-template-columns: 100%;
  }
`;

export const Body = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 30% 70%;
  @media screen and (max-width: 960px) {
    grid-template-columns: 100%;
  }
`;

export const LeftCol = styled.div`
  max-width: 320px;
  display: flex;
  flex-direction: column;
  padding: 48px 0 48px 48px;

  @media screen and (max-width: 960px) {
    padding: 24px;
    max-width: 100%;
  }
`;

export const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;

export const Link = styled(RouterLink)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  color: #cbcbcb;
  width: fit-content;
`;

export const BackArrow = styled(ArrowBackIosIcon)`
  font-size: 16px;
  color: #cbcbcb;
  padding-bottom: 2px;
`;

export const BalanceAmount = styled.span`
  padding-top: 15px;
  font-weight: 500;
  font-size: 48px;
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const AvailableAmount = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
`;

export const Available = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 16px;
`;

export const AvailableSubText = styled.span`
  font-size: 14px;
  color: #9e9e9e;
  font-weight: 400;
  padding-left: 5px;
`;

export const Tab = styled.span`
  font-weight: 600;
  font-size: 22px;
  line-height: 27.83px;
  padding-bottom: 12px;
  border: none;
  position: relative;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

export const SeeMore = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  text-align: end;
  padding-top: 20px;
  padding-right: 40px;
  padding-bottom: 40px;
  width: fit-content;
  :hover {
    cursor: pointer;
  }
`;

export const LatestTransactionsContainer = styled.div<{ overflow?: boolean }>`
  padding: 0 48px;
  height: ${(props) => (props.overflow ? `70%` : `70%`)};
  overflow-y: ${(props) => (props.overflow ? `auto` : `hidden`)};

  @media screen and (max-width: 960px) {
    padding: 24px;
    overflow-y: auto;
  }
`;

export const TabContainer = styled.div`
  padding: 48px 48px 0 48px;
  @media screen and (max-width: 960px) {
    padding: 24px;
  }
`;

export const HeaderText = styled.span`
  font-size: 30px;
  font-weight: 600;
  padding-top: 32px;
`;

export const ActionButton = styled.button`
  width: 269px;
  height: 56px;
  color: white;
  background-color: black;
  border: none;
  font-weight: 600;
  font-size: 20px;
  border-radius: 35px;
  border: 2px solid black;
  :hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
  :focus {
    outline: none;
  }

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const GrayLine = styled.div`
  border-bottom: 2px solid #d8d8d8;
  padding-top: 12px;
`;

export const AvailableText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #9e9e9e;
  padding-right: 8px;
`;
