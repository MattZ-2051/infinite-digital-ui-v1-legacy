import React, { useState } from 'react';
import coinbaseIcon from 'assets/img/icons/coinbase.png';
import hbarIcon from 'assets/img/icons/hbar-icon.png';
import depositIcon from 'assets/svg/icons/deposit-funds.svg';
import withdrawIcon from 'assets/svg/icons/withdraw-funds.svg';
import redeemIcon from 'assets/svg/icons/redeemable-border.svg';
import claimedIcon from 'assets/svg/icons/claimed.svg';
import dollarSign from 'assets/img/icons/dollarSign-icon.png';
import purchaseIcon from 'assets/img/icons/purchase-icon.png';
import { ITransaction } from 'entities/transaction';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ActionInfo from './actionInfo';
import { useTheme } from '@material-ui/core/styles';
import * as S from './styles';

interface IProps {
  tx: ITransaction;
}

interface DateTimeOptions {
  year: 'numeric';
  month: 'long';
  day: 'numeric';
}

const CCDepositInfo = ({ tx }: { tx: ITransaction }) => (
  <>
    <S.Icon src={depositIcon} />
    <S.HistoryLine>
      <span>
        <span>
          {tx.status === 'error' ? 'You tried to add funds' : 'You added funds'}{' '}
          from your{' '}
        </span>
        <span style={{ fontWeight: 800, color: 'black' }}>
          {tx.transactionData.deposit?.card?.network}
        </span>
        <span> credit card ending in </span>
        <span style={{ fontWeight: 800, color: 'black' }}>
          {tx.transactionData.deposit?.card?.last4}
        </span>
      </span>
    </S.HistoryLine>
    <S.Bold style={{ color: tx.status === 'error' ? '#DA1010' : undefined }}>
      {tx.status === 'pending'
        ? '(Pending)'
        : tx.status === 'error'
        ? '(Transaction Failed)'
        : ''}
    </S.Bold>
  </>
);

const CoinbaseDepositInfo = ({ tx }: { tx: ITransaction }) => (
  <>
    <S.Icon src={coinbaseIcon} />
    <S.HistoryLine>
      {tx.status === 'success'
        ? 'You added funds by depositing'
        : tx.status === 'pending'
        ? 'You added funds by depositing'
        : 'You tried to add funds by depositing'}
      <S.Bold>
        $
        {tx.transactionData.deposit &&
          parseFloat(tx.transactionData.deposit.amount).toFixed(2)}
        (
        {tx.transactionData.deposit?.coinbasePayment &&
          `${parseFloat(
            tx.transactionData.deposit.coinbasePayment.amount
          ).toFixed(4)} ${tx.transactionData.deposit.coinbasePayment.currency}`}
        )
      </S.Bold>
      using
      <S.Bold>Coinbase</S.Bold>
      {tx.status === 'pending' ? (
        <S.Bold>(Pending)</S.Bold>
      ) : tx.status === 'error' ? (
        <S.Bold>(Transaction Failed)</S.Bold>
      ) : null}
    </S.HistoryLine>
  </>
);

const HbarDepositInfo = ({ tx }: { tx: ITransaction }) => (
  <>
    <S.Icon src={hbarIcon} width="auto" height="32px" />
    <S.HistoryLine>
      {tx.status === 'success'
        ? 'You added funds by depositing'
        : tx.status === 'pending'
        ? 'You added funds by depositing'
        : 'You tried to add funds by depositing'}
      <S.Bold>{tx.transactionData.deposit?.amountUnrated}&nbsp;Hbar</S.Bold>
      {tx.status === 'pending' || tx.status === 'success' ? (
        <S.Bold
          style={{ textTransform: 'capitalize' }}
        >{`(${tx.status})`}</S.Bold>
      ) : tx.status === 'error' ? (
        <S.Bold>(Transaction Failed)</S.Bold>
      ) : null}
    </S.HistoryLine>
  </>
);

const CircleDepositInfo = ({ tx }: { tx: ITransaction }) => (
  // <div style={{ display: 'flex', alignItems: 'center' }}>
  <>
    <S.UsdcIcon />
    <S.HistoryLine>
      {tx.status === 'success'
        ? 'You added funds by depositing'
        : tx.status === 'pending'
        ? 'You added funds by'
        : 'You tried to add funds by depositing'}

      <S.Bold>USDC</S.Bold>
      {tx.status === 'pending' ? (
        <S.Bold>(Pending)</S.Bold>
      ) : tx.status === 'error' ? (
        <S.Bold>(Transaction Failed)</S.Bold>
      ) : null}
    </S.HistoryLine>
  </>
  //</div>
);

const amountText = (tx) => {
  let text = tx.status === 'success' ? '+' : '';
  text += '$';
  if (tx.transactionData.deposit)
    text += parseFloat(tx.transactionData?.deposit?.amount).toFixed(2);
  return text;
};

const DepositBox = ({ tx }: { tx: ITransaction }) => (
  <S.Color
    color={
      tx.status === 'success'
        ? '#00C44F'
        : tx.status === 'pending'
        ? '#9e9e9e'
        : 'black'
    }
    style={{
      textDecoration: tx.status === 'error' ? 'line-through' : undefined,
    }}
  >
    <div style={{ marginLeft: '3px' }}>{amountText(tx)}</div>
  </S.Color>
);

const PurchaseInfo = ({ tx }: { tx: ITransaction }) => (
  <>
    <S.Icon src={purchaseIcon} />
    <S.HistoryLine>
      {tx.status === 'success'
        ? 'You bought'
        : tx.status === 'pending'
        ? 'You bought from'
        : 'You tried buying from'}
      <S.Link to={`/marketplace/${tx.transactionData?.sku?._id}`}>
        {tx.transactionData.sku?.name}
      </S.Link>
      <S.Link to={`/product/${tx.transactionData?.product[0]?._id}`}>
        #{tx.transactionData.product[0]?.serialNumber}
      </S.Link>
      from
      <S.Link to={`/collection/${tx.transactionData?.seller?.username}`}>
        @{tx.transactionData?.seller?.username}
      </S.Link>
      {tx.status === 'pending' ? (
        <S.Bold>(Pending)</S.Bold>
      ) : tx.status === 'error' ? (
        <S.Bold style={{ color: '#DA1010' }}>(Transaction Failed)</S.Bold>
      ) : null}
    </S.HistoryLine>
  </>
);

const PurchaseBox = ({ tx }: { tx: ITransaction }) => (
  <S.Color
    color={
      tx.status === 'success'
        ? '#DA1010'
        : tx.status === 'pending'
        ? '#9e9e9e'
        : 'black'
    }
    style={{
      textDecoration: tx.status === 'error' ? 'line-through' : undefined,
    }}
  >
    {tx.status === 'success' ? '- ' : ''}$
    {tx.transactionData?.cost?.totalCost.toFixed(2)}
  </S.Color>
);

const WithdrawalInfo = ({ tx }: { tx: ITransaction }) => (
  <>
    <S.Icon src={withdrawIcon} />
    <span>
      <span>
        {tx.status === 'error' ? 'You tried to withdraw' : 'You withdrew'} funds
        to bank {tx.transactionData.withdraw?.institution_name} and account
        ending in{' '}
      </span>
      <span style={{ fontWeight: 800, color: 'black' }}>
        {tx.transactionData.withdraw?.ach_number}
      </span>
    </span>
    <S.Bold style={{ color: tx.status === 'error' ? '#DA1010' : undefined }}>
      {tx.status === 'error'
        ? '(Transaction Failed)'
        : tx.status === 'pending'
        ? '(Pending)'
        : ''}
    </S.Bold>
  </>
);

const WithdrawalBox = ({ tx }: { tx: ITransaction }) => (
  <S.Color
    color={
      tx.status === 'success'
        ? '#DA1010'
        : tx.status === 'pending'
        ? '#9e9e9e'
        : 'black'
    }
    style={{
      textDecoration: tx.status === 'error' ? 'line-through' : undefined,
    }}
  >
    {tx.status === 'success' ? '- ' : ''} ${' '}
    {tx.transactionData.withdraw?.amount || 0}
  </S.Color>
);

const SaleInfo = ({ tx }: { tx: ITransaction }) => (
  <>
    <S.Icon src={dollarSign} />
    <S.HistoryLine>
      You sold
      <S.Link to={`/marketplace/${tx.transactionData?.sku?._id}`}>
        {tx.transactionData.sku?.name}
      </S.Link>
      <S.Link to={`/product/${tx.transactionData.product[0]?._id}`}>
        #{tx.transactionData.product[0]?.serialNumber}
      </S.Link>
      to
      <S.Link to={`/collection/${tx.transactionData?.buyer?.username}`}>
        @{tx.transactionData?.buyer?.username}
      </S.Link>
    </S.HistoryLine>
  </>
);

const SaleBox = ({ tx }: { tx: ITransaction }) => (
  <S.Color color="#00C44F">
    + ${tx.transactionData.cost?.finalPayout.toFixed(2)}
  </S.Color>
);

const RoyaltyInfo = ({ tx }: { tx: ITransaction }) => (
  <>
    <S.Icon src={dollarSign} />
    <S.HistoryLine>
      You received a royalty payment for the sale of
      <S.Link to={`/marketplace/${tx.transactionData?.sku?._id}`}>
        {tx.transactionData.sku?.name}
      </S.Link>
      <S.Link to={`/product/${tx.transactionData?.product[0]?._id}`}>
        #{tx.transactionData.product[0]?.serialNumber}
      </S.Link>
    </S.HistoryLine>
  </>
);

const RoyaltyBox = ({ tx }: { tx: ITransaction }) => (
  <S.Color color="#00C44F">
    + $
    {tx.transactionData.cost.royaltyFee &&
      tx.transactionData.cost.royaltyFee.toFixed(2)}
  </S.Color>
);

const getTransactionDetailObj = (tx) => {
  return {
    purchase: <PurchaseBox tx={tx} />,
    deposit: <DepositBox tx={tx} />,
    withdrawal: <WithdrawalBox tx={tx} />,
    sale: <SaleBox tx={tx} />,
    royalty_fee: <RoyaltyBox tx={tx} />,
  };
};

const dateOptions: DateTimeOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const Transaction = ({ tx }: IProps) => {
  const transactionDetail = getTransactionDetailObj(tx);
  const txCreatedAtDate = new Date(tx.createdAt);
  const [showTxId, setShowTxId] = useState<boolean>(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <S.Container>
      <S.TransactionDescription>
        {tx.type === 'purchase' && <PurchaseInfo tx={tx} />}
        {tx.type === 'sale' && <SaleInfo tx={tx} />}
        {tx.type === 'royalty_fee' && <RoyaltyInfo tx={tx} />}
        {tx.type === 'withdrawal' && <WithdrawalInfo tx={tx} />}
        {tx.type === 'claim' && (
          <ActionInfo tx={tx} text="You claimed" icon={claimedIcon} />
        )}
        {tx.type === 'nft_redeem' && (
          <ActionInfo tx={tx} text="You redeemed" icon={redeemIcon} />
        )}
        {tx.type === 'deposit' &&
          tx.transactionData?.deposit?.type === 'cc' && (
            <CCDepositInfo tx={tx} />
          )}
        {tx.type === 'deposit' &&
          tx.transactionData?.deposit?.type === 'circle' && (
            <CircleDepositInfo tx={tx} />
          )}
        {tx.type === 'deposit' &&
          tx.transactionData?.deposit?.type === 'coinbase' && (
            <CoinbaseDepositInfo tx={tx} />
          )}
        {tx.type === 'deposit' &&
          tx.transactionData?.deposit?.type === 'hbar' && (
            <HbarDepositInfo tx={tx} />
          )}
      </S.TransactionDescription>
      {!isSmall ? (
        <>
          <S.DateContainer>
            <S.Date>
              {txCreatedAtDate.toLocaleDateString('en-US', dateOptions)}
            </S.Date>
          </S.DateContainer>
          <S.TransactionDetail>
            {transactionDetail[tx.type]}
          </S.TransactionDetail>
        </>
      ) : (
        <S.TransactionDetail>
          <S.DateContainer>
            {transactionDetail[tx.type]}

            <S.Date>
              {txCreatedAtDate.toLocaleDateString('en-US', dateOptions)}
            </S.Date>
          </S.DateContainer>
        </S.TransactionDetail>
      )}
      <S.TransactionDetail>
        {showTxId ? (
          <S.UpArrow onClick={() => setShowTxId((prev) => !prev)} />
        ) : (
          <S.DownArrow onClick={() => setShowTxId((prev) => !prev)} />
        )}
      </S.TransactionDetail>
      {showTxId && (
        <S.TxIdContainer>
          Transaction ID: <S.TxId>{tx._id}</S.TxId>
          {
            Boolean(tx.transactionData?.deposit?.hederaTransactionLink) && (
              <>
                <br/>
                Hedera transaction ID: <a
                  href={tx.transactionData.deposit?.hederaTransactionLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <S.TxId>{tx.transactionData.deposit?.hederaTransaction?.id}</S.TxId>
                </a><br/>
                Conversion rate: 1 hbar = {tx.transactionData.deposit?.hederaTransaction?.rate} USD
              </>
            )
          }
        </S.TxIdContainer>
      )}
    </S.Container>
  );
};
export default Transaction;
