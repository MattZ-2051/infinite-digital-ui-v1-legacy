import React from 'react';
import styled from 'styled-components';
import coinbaseIcon from 'assets/img/icons/coinbase.png';
import depositIcon from 'assets/img/icons/Added-funds.png';
import withdrawIcon from 'assets/img/icons/withdraw-icon.png';
import dollarSign from 'assets/img/icons/dollarSign-icon.png';
import purchaseIcon from 'assets/img/icons/purchase-icon.png';
import { ITransaction } from 'entities/transaction';

interface IProps {
  tx: ITransaction;
}

interface DateTimeOptions {
  year: 'numeric';
  month: 'long';
  day: 'numeric';
}

const Transaction = ({ tx }: IProps) => {
  const txCreatedAtDate = new Date(tx.createdAt);
  const options: DateTimeOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <Container>
      <TransactionDescription>
        {tx.type === 'purchase' && (
          <>
            <img src={purchaseIcon} style={{ paddingRight: '24px' }} />
            <span>
              You bought {tx.transactionData.sku[0]?.name}{' '}
              <span style={{ color: 'black', fontWeight: 600 }}>
                #{tx.transactionData.product[0]?.serialNumber}
              </span>
            </span>
          </>
        )}
        {tx.type === 'sale' && (
          <>
            <img src={dollarSign} style={{ paddingRight: '24px' }} />
            <span>
              You sold {tx.transactionData.sku[0]?.name}
              <span style={{ color: 'black', fontWeight: 600 }}>
                {tx.transactionData.product[0]?.serialNumber}
              </span>
            </span>
          </>
        )}
        {tx.type === 'deposit' && tx.transactionData?.service === 'circle' && (
          <>
            <img src={depositIcon} style={{ paddingRight: '24px' }} />
            <span>You added funds from your credit card</span>
          </>
        )}
        {tx.type === 'deposit' &&
          tx.transactionData?.service === 'circle' &&
          tx.transactionData?.status === 'completed' && (
            <>
              <img src={depositIcon} style={{ paddingRight: '24px' }} />
              <span>You added funds from your credit card</span>
            </>
          )}
        {tx.type === 'deposit' &&
          tx.transactionData?.service === 'circle' &&
          tx.transactionData?.status === 'pending' && (
            <>
              <img src={depositIcon} style={{ paddingRight: '24px' }} />
              <span>You added funds from your credit card</span>
              <span style={{ color: 'black', fontWeight: 600 }}>
                {'(Pending)'}
              </span>
            </>
          )}
      </TransactionDescription>

      <TransactionDetail>
        <span style={{ color: '#9E9E9E' }}>
          {txCreatedAtDate.toLocaleDateString('en-US', options)}
        </span>
      </TransactionDetail>

      <TransactionDetail>
        {tx.type === 'purchase' && tx.status === 'success' && (
          <span style={{ color: '#DA1010' }}>
            - ${tx.transactionData.cost.totalCost}
          </span>
        )}

        {tx.type === 'deposit' &&
          tx.transactionData?.status === 'completed' && (
            <span style={{ color: '#00C44F' }}>+ ${tx.transactionData}</span>
          )}
        {tx.type === 'deposit' && tx.transactionData?.status === 'pending' && (
          <span style={{ color: '#9e9e9e' }}>+ ${tx.transactionData}</span>
        )}
        {tx.type === 'sale' && (
          <span style={{ color: '#00C44F' }}>
            + ${tx.transactionData.cost?.totalCost}
          </span>
        )}
      </TransactionDetail>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 60% 20% 20%;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
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
  color: #9e9e9e;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export default Transaction;
