import styled from 'styled-components';

interface IProps { }

const ActiveBids = () => {

  return (
    <Container>
      <TransactionDescription>
      </TransactionDescription>
      <TransactionDetail>
      </TransactionDetail>
      <TransactionDetail>
      </TransactionDetail>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 60% 20% 20%;
  border-top: 1px solid #EBEBEB;
  border-bottom: 1px solid #EBEBEB;
  padding: 20px 0;
`;

const TransactionDetail = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TransactionDescription = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #9E9E9E;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export default ActiveBids;
