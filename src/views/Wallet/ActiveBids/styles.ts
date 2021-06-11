import styled from 'styled-components/macro';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export const PaginationContainer = styled.div``;

export const BidsGrid = styled.div`
  margin-bottom: 30px;
`;

export const NoResults = styled.div``;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  padding: 20px 0;
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
  font-weight: 400;
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
  justify-content: space-between;
`;
