import React from 'react';
import styled from 'styled-components';
import coinbaseIcon from 'assets/img/icons/coinbase.png';
import depositIcon from 'assets/img/icons/Added-funds.png';
import withdrawIcon from 'assets/img/icons/withdraw-icon.png';
import dollarSign from 'assets/img/icons/dollarSign-icon.png';
import purchaseIcon from 'assets/img/icons/purchase-icon.png';

interface IProps {
  date?: string;
  transactionDetail?: string;
  amount?: string;
  transactionType?:
    | 'cc-deposit'
    | 'coinbase'
    | 'withdraw'
    | 'sale'
    | 'purchase';
  skuName?: string;
  productSerialNum?: number;
  buyerName?: string;
  sellerName?: string;
}

const Transaction = ({
  date,
  transactionDetail,
  amount,
  transactionType,
  skuName,
  buyerName,
  productSerialNum,
  sellerName,
}: IProps) => {
  return (
    <Container>
      <TransactionDescription>
        {transactionType === 'cc-deposit' && (
          <>
            <img src={depositIcon} style={{ paddingRight: '24px' }} />
            <span>You added funds from your credit card ending in</span>
            <span style={{ color: 'black', paddingLeft: '5px' }}>
              {transactionDetail || 'creditCardId'}
            </span>
          </>
        )}
        {transactionType === 'coinbase' && (
          <>
            <img src={coinbaseIcon} style={{ paddingRight: '24px' }} />
            <div>
              <span>You added funds using</span>
              <span style={{ color: 'black', paddingLeft: '5px' }}>
                Coinbase
              </span>
            </div>
          </>
        )}
        {transactionType === 'withdraw' && (
          <>
            <img src={withdrawIcon} style={{ paddingRight: '24px' }} />
            <div>
              <span>You withdrew funds to your bank account ending in</span>
              <span style={{ color: 'black', paddingLeft: '5px' }}>
                {transactionDetail || 'creditCardId'}
              </span>
            </div>
          </>
        )}
        {transactionType === 'sale' && (
          <>
            <img src={dollarSign} style={{ paddingRight: '24px' }} />
            <div>
              <span>You sold {skuName || 'K8IROS 8.1 - BK Shadow'}</span>
              <span style={{ color: 'black', padding: '0 5px' }}>
                {productSerialNum || '#2468'}
              </span>
              to
              <span style={{ color: 'black', paddingLeft: '5px' }}>
                {buyerName || '@drBrown'}
              </span>
            </div>
          </>
        )}
        {transactionType === 'purchase' && (
          <>
            <img src={purchaseIcon} style={{ paddingRight: '24px' }} />
            <div>
              <span>You bought {skuName || 'Goat IV'}</span>
              <span style={{ color: 'black', padding: '0 5px' }}>
                {productSerialNum || '#2468'}
              </span>
              from
              <span style={{ color: 'black', paddingLeft: '5px' }}>
                {sellerName || '@jamesjean'}
              </span>
            </div>
          </>
        )}
      </TransactionDescription>
      <TransactionDetail>
        <span style={{ color: '#9E9E9E' }}>{date || 'Mar 30, 2021'}</span>
      </TransactionDetail>
      <TransactionDetail>
        {transactionType === 'coinbase' && (
          <span style={{ color: '#00C44F' }}>+ {amount || '$200.00'}</span>
        )}
        {transactionType === 'cc-deposit' && (
          <span style={{ color: '#00C44F' }}>+ {amount || '$200.00'}</span>
        )}
        {transactionType === 'sale' && (
          <span style={{ color: '#00C44F' }}>+ {amount || '$200.00'}</span>
        )}
        {transactionType === 'withdraw' && (
          <span style={{ color: '#DA1010' }}>- {amount || '$200.00'}</span>
        )}
        {transactionType === 'purchase' && (
          <span style={{ color: '#DA1010' }}>- {amount || '$200.00'}</span>
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
