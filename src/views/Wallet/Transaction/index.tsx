import React from 'react';
import styled from 'styled-components';

const Transaction = () => {

  return (
    <Container>
      <div>Icon</div>
      <TransactionDescription><span style={{ color: 'black' }}>Money added</span> to your wallet</TransactionDescription>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span>Mar 30, 2021</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span>+ $200.00</span>
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 10% 50% 20% 20%;
  border-top: 1px solid #EBEBEB;
  border-bottom: 1px solid #EBEBEB;
  padding: 10px 0;
`;

const TransactionDescription = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #9E9E9E;
`;

export default Transaction;
