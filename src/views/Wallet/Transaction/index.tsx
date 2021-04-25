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

const Transaction = ({ tx }: IProps) => {
  return (
    <Container>
      <TransactionDescription>
        {tx.type === 'purchase' && (
          <>
            <img src={purchaseIcon} style={{ paddingRight: '24px' }} />
            <span>You purchased something for</span>
            <span style={{ color: 'black', paddingLeft: '5px' }}>
              ${tx.transactionData.amount}
            </span>
          </>
        )}
        {tx.type === 'sale' && (
          <>
            <img src={purchaseIcon} style={{ paddingRight: '24px' }} />
            <span>You sold</span>
            <span style={{ color: 'black', paddingLeft: '5px' }}>
              ${tx.transactionData.amount}
            </span>
          </>
        )}
        {tx.type === 'transfer' && (
          <>
            <img src={purchaseIcon} style={{ paddingRight: '24px' }} />
            <span>You transferred</span>
            <span style={{ color: 'black', paddingLeft: '5px' }}>
              ${tx.transactionData.amount}
            </span>
          </>
        )}
        {tx.type === 'withdrawal' && (
          <>
            <img src={purchaseIcon} style={{ paddingRight: '24px' }} />
            <span>You withdrew</span>
            <span style={{ color: 'black', paddingLeft: '5px' }}>
              ${tx.transactionData.amount}
            </span>
          </>
        )}
        {tx.type === 'payment' && (
          <>
            <img src={depositIcon} style={{ paddingRight: '24px' }} />
            <span>You transferred</span>
            <span style={{ color: 'black', paddingLeft: '5px' }}>
              ${tx.transactionData.circleReceipt?.amount.amount}
            </span>
          </>
        )}
        {tx.type === 'topup' && (
          <>
            <img src={dollarSign} style={{ paddingRight: '24px' }} />
            <span>You made a deposit</span>
            <span style={{ color: 'black', paddingLeft: '5px' }}>
              ${tx.transactionData.circleReceipt?.amount.amount}
            </span>
          </>
        )}
        {tx.type === 'redeem' && (
          <>
            <img src={depositIcon} style={{ paddingRight: '24px' }} />
            <span>Redeem tx tbd...</span>
            <span style={{ color: 'black', paddingLeft: '5px' }}>
              ${tx.transactionData.amount}
            </span>
          </>
        )}
        {/* <>
          <img src={depositIcon} style={{ paddingRight: '24px' }} />
          <span>You added funds from your credit card ending in</span>
          <span style={{ color: 'black', paddingLeft: '5px' }}>
            {'creditCardId'}
          </span>
          <img src={coinbaseIcon} style={{ paddingRight: '24px' }} />
          <div>
            <span>You added funds using</span>
            <span style={{ color: 'black', paddingLeft: '5px' }}>Coinbase</span>
          </div>
          <img src={withdrawIcon} style={{ paddingRight: '24px' }} />
          <div>
            <span>You withdrew funds to your bank account ending in</span>
            <span style={{ color: 'black', paddingLeft: '5px' }}>
              {'creditCardId'}
            </span>
          </div>
          <img src={dollarSign} style={{ paddingRight: '24px' }} />
          <div>
            <span>You sold {'K8IROS 8.1 - BK Shadow'}</span>
            <span style={{ color: 'black', padding: '0 5px' }}>{'#2468'}</span>
            to
            <span style={{ color: 'black', paddingLeft: '5px' }}>
              {'@drBrown'}
            </span>
          </div>
          <img src={purchaseIcon} style={{ paddingRight: '24px' }} />
          <div>
            <span>You bought {'Goat IV'}</span>
            <span style={{ color: 'black', padding: '0 5px' }}>{'#2468'}</span>
            from
            <span style={{ color: 'black', paddingLeft: '5px' }}>
              {'@jamesjean'}
            </span>
          </div>
        </> */}
      </TransactionDescription>

      <TransactionDetail>
        <span style={{ color: '#9E9E9E' }}>{tx.createdAt}</span>
      </TransactionDetail>

      <TransactionDetail>
        {tx.type === 'purchase' && (
          <span style={{ color: '#00C44F' }}>
            + ${tx.transactionData.amount}
          </span>
        )}
        {tx.type === 'payment' && (
          <span style={{ color: '#00C44F' }}>
            + ${tx.transactionData.circleReceipt?.amount.amount}
          </span>
        )}
        {tx.type === 'topup' && (
          <span style={{ color: '#00C44F' }}>
            + ${tx.transactionData.circleReceipt?.amount.amount}
          </span>
        )}
        {tx.type === 'redeem' && (
          <span style={{ color: '#DA1010' }}>- {'$tbd'}</span>
        )}
        {tx.type === 'sale' && (
          <span style={{ color: '#DA1010' }}>- {'$tbd'}</span>
        )}
        {tx.type === 'transfer' && (
          <span style={{ color: '#DA1010' }}>- {'$tbd'}</span>
        )}
        {tx.type === 'withdrawal' && (
          <span style={{ color: '#DA1010' }}>- {'$tbd'}</span>
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
