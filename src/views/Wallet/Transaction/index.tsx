import React from 'react';
import styled from 'styled-components';

interface IProps {
  date?: string;
  transactionDetail?: string;
  amount?: string;
  transactionType?: 'cc-deposit' | 'coinbase' | 'withdraw' | 'sale' | 'purchase'
}

const Transaction = ({ date, transactionDetail, amount, transactionType }: IProps) => {

  return (
    <Container>
      <div>Icon</div>
      <TransactionDescription>
        <span style={{ color: 'black' }}>Money added</span> to your wallet
        </TransactionDescription>
      <TransactionDetail>
        <span>{date || 'Mar 30, 2021'}</span>
      </TransactionDetail>
      <TransactionDetail>
        <span>+ {amount || '$200.00'}</span>
      </TransactionDetail>
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

const TransactionDetail = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TransactionDescription = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #9E9E9E;
`;

export default Transaction;
