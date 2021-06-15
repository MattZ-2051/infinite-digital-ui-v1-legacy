import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Pagination from '@material-ui/lab/Pagination';

export const Container = styled.div`
  padding: 48px 48px 48px 48px;
  height: 100%;
  overflow: hidden;
  width: 100%;
  @media screen and (max-width: 1160px) {
    padding: 48px 24px 48px 24px;
  }
`;

export const BorderTop = styled.div`
  border-top: 1px solid #2e2e2e;
`;

export const MainContent = styled.div`
  margin: auto;
  // max-width: 1440px;
  height: 100vh;
  background-color: #1a1a1a;
  color: white;
  display: grid;
  padding-left: 80px;
  grid-template-columns: 480px 1fr;

  @media screen and (max-width: 1160px) {
    height: auto;
    display: flex;
    flex-direction: column;
    height: auto;
    padding-left: 0px;
  }
`;

export const TitleLink = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  color: white;
  text-decoration: none;
  :focus {
    color: white;
  }
`;

export const Title = styled.div`
  color: #7c7c7c;
  font-size: 16px;
`;

export const SectionTitle = styled.div`
  font-size: 48px;
  line-height: 61px;
  display: flex;
  align-items: center;
  letter-spacing: -2px;
  color: #ffffff;
`;

export const MainContainerRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  border-bottom: 1px solid #2e2e2e;
  padding: 10px 20px;
  margin-top: 30px;
  :hover {
    cursor: pointer;
  }
`;

export const TransactionDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ArrowIcon = styled(ArrowForwardIosIcon)`
  color: #9e9e9e;
  margin-bottom: 3px;
  :hover.redirect {
    cursor: pointer;
    transform: scale(1.1);
    color: black;
  }
`;

export const Name = styled.span`
  font-size: 16px;
  display: flex;
  font-weight: 400;
  color: white;
`;

export const TransactionDescription = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 18px;
  color: #9e9e9e;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const ContainerRow = styled.div``;

export const TransactionRow = styled.div`
  display: flex;
  align-items: center;
`;

export const TranscriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Items = styled.div`
  padding-top: 24px;
  width: 100%;
  overflow: hidden;
  height: 700px;
  :hover {
    overflow: auto;
  }

  @media screen and (max-width: 960px) {
    margin-left: 0;
  }
`;

export const NoOwners = styled.div`
  padding-top: 24px;
  font-size: 16px;
  color: #9e9e9e;
  font-weight: 600;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 20px;
  width: 100%;
`;

export const CustomPagination = styled(Pagination)`
  .MuiPaginationItem-root {
    color: white;
  }
  .MuiPaginationItem-page.Mui-selected {
    color: black !important;
    background-color: white;
  }
`;

export const PaginationContainer = styled.div`
  margin-top: 40px;
`;
