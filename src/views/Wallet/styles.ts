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
  height: 100%;
  max-width: 1440px;
  margin: auto;
  margin: 10 auto;
  @media screen and (max-width: 960px) {
    grid-template-columns: 100%;
  }
`;

export const Body = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 25% 75%;
  @media screen and (max-width: 960px) {
    grid-template-columns: 100%;
  }
`;

export const LeftCol = styled.div`
  height: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  padding: 48px 0 48px 48px;
  margin-bottom: 97px;
  @media screen and (max-width: 960px) {
    padding: 24px;
    max-width: 100%;
    margin-bottom: 0;
  }
`;

export const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  height: 100%;
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
  font-weight: 400;
  color: black;
  font-family: 'Circular';
  padding-left: 2px;
`;

export const Available = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 16px;
`;

export const AvailableSubText = styled.span`
  font-family: 'PlusJakartaSans';
  font-size: 12px;
  color: #9e9e9e;
  font-weight: 400;
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

export const GridContainer = styled.div<{ overflow?: boolean }>`
  padding: 0 48px;
  height: 95%; // ${(props) => (props.overflow ? `80%` : `80%`)};
  overflow-y: ${(props) => (props.overflow ? `auto` : `hidden`)};
  margin-bottom: 10px;
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
  width: 302px;
  height: 56px;
  color: white;
  background-color: black;
  border: none;
  justify-content: space-between;
  display: flex;
  align-items: center;
  border-radius: 26px;
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

export const GreyBigText = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #000000;
  padding-right: 8px;
`;
export const Icon = styled.img`
  padding-right: 20px;
`;

export const TextInButton = styled.div`
  padding-left: 21px;
  font-weight: 400;
  font-size: 20px;
  font-family: 'Circular';
`;

export const IconContainer = styled.div`
  display: flex;
`;

export const ButtonContainer = styled.div`
  padding-top: 16px;
`;

export const ProductsGrid = styled.div`
  margin-bottom: 30px;
`;

export const Content = styled.section`
  width: 100%;
`;

export const PaginationContainer = styled.div``;

export const NoResults = styled.div``;

//export const GridContainer = styled.div<{ overflow?: boolean }>`

export const OptionsContainers = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TabOptions = styled.div`
  position: relative;
  display: flex;
`;

export const TabButton = styled.div<{
  selectedTab: number;
  highlightOption: number;
}>`
  margin-bottom: -14px;
  margin-right: 20px;
  padding-bottom: 12px;
  border-bottom: ${(pps) =>
    pps.selectedTab === pps.highlightOption ? `2px solid black` : `none`};
  color: ${(pps) =>
    pps.selectedTab === pps.highlightOption ? `black` : `#9e9e9e`};
`;

export const ToolTip = styled.span`
  position: relative;
  &:before {
    content: attr(data-text);
    position: absolute;

    bottom: 100%;
    transform: translateY(-50%);

    left: 50%;
    transform: translateX(-50%);

    font-size: 12px;
    width: 100%;
    max-width: min(300px, 100%);
    padding: 10px;
    border-radius: 10px;
    background: black;
    color: #fff;
    text-align: center;

    display: none;
  }

  &:after {
    content: '';
    position: absolute;

    bottom: 100%;
    margin-bottom: -19px;

    left: 50%;
    transform: translateX(-50%);

    /* the arrow */
    border: 10px solid #000;
    border-color: black transparent transparent transparent;

    display: none;
  }
  &:hover:before,
  &:hover:after {
    display: block;
  }
`;
