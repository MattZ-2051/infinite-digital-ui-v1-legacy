import { useState } from 'react';
import coinbaseIcon from 'assets/img/icons/coinbase.png';
import depositIcon from 'assets/img/icons/Added-funds.png';
import dollarSign from 'assets/img/icons/dollarSign-icon.png';
import purchaseIcon from 'assets/img/icons/purchase-icon.png';
import { ITransaction } from 'entities/transaction';
import * as S from './styles';

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
  const [showTxId, setShowTxId] = useState<boolean>(false);
  const options: DateTimeOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return (
    <S.Container>
      <S.TransactionDescription>
        {tx.type === 'purchase' && tx.status === 'success' && (
          <>
            <S.Icon src={purchaseIcon} />
            <span>You bought</span>
            <S.Link to={`/marketplace/${tx.transactionData?.sku[0]?._id}`}>
              {tx.transactionData.sku[0]?.name}
            </S.Link>
            <S.Link to={`/product/${tx.transactionData?.product[0]?._id}`}>
              #{tx.transactionData.product[0]?.serialNumber}
            </S.Link>
            <span>from</span>
            <S.Link to={`/collection/${tx.transactionData?.seller?._id}`}>
              @{tx.transactionData?.seller?.username}
            </S.Link>
          </>
        )}
        {tx.type === 'purchase' && tx.status === 'pending' && (
          <>
            <S.Icon src={purchaseIcon} />
            <span>You bought from</span>
            <S.Link to={`/marketplace/${tx.transactionData?.sku[0]?._id}`}>
              {tx.transactionData.sku[0]?.name}
            </S.Link>
            <S.Link to={`/collection/${tx.transactionData?.seller?._id}`}>
              @{tx.transactionData?.seller?.username}
            </S.Link>
            <S.Bold>(Pending)</S.Bold>
          </>
        )}
        {tx.type === 'purchase' && tx.status === 'error' && (
          <>
            <S.Icon src={purchaseIcon} />
            <span>You tried buying from</span>
            <S.Link to={`/marketplace/${tx.transactionData.sku[0]?._id}`}>
              {tx.transactionData.sku[0]?.name}
            </S.Link>
            <S.Link to={`/collection/${tx.transactionData?.seller?._id}`}>
              @{tx.transactionData?.seller?.username}
            </S.Link>
            <S.Bold style={{ color: '#DA1010' }}>(Transaction Failed)</S.Bold>
          </>
        )}
        {tx.type === 'sale' && (
          <>
            <S.Icon src={dollarSign} />
            <span>You sold</span>
            <S.Link to={`/marketplace/${tx.transactionData?.sku[0]?._id}`}>
              {tx.transactionData.sku[0]?.name}
            </S.Link>
            <S.Link to={`/product/${tx.transactionData.product[0]?._id}`}>
              #{tx.transactionData.product[0]?.serialNumber}
            </S.Link>
            to
            <S.Link to={`/collection/${tx.transactionData?.buyer?._id}`}>
              @{tx.transactionData?.buyer?.username}
            </S.Link>
          </>
        )}
        {tx.type === 'royalty_fee' && (
          <>
            <S.Icon src={dollarSign} />
            <span>You received a royalty payment for the sale of</span>
            <S.Link to={`/marketplace/${tx.transactionData?.sku[0]?._id}`}>
              {tx.transactionData.sku[0]?.name}
            </S.Link>
            <S.Link to={`/product/${tx.transactionData?.product[0]?._id}`}>
              #{tx.transactionData.product[0]?.serialNumber}
            </S.Link>
          </>
        )}
        {tx.type === 'deposit' &&
          tx.transactionData?.deposit?.type === 'cc' &&
          tx.status === 'success' && (
            <>
              <S.Icon src={depositIcon} />
              <span>You added funds from your credit card</span>
            </>
          )}
        {tx.type === 'deposit' &&
          tx.transactionData?.deposit?.type === 'cc' &&
          tx.status === 'pending' && (
            <>
              <S.Icon src={depositIcon} />
              <span>You added funds from your credit card</span>
              <S.Bold>(Pending)</S.Bold>
            </>
          )}
        {tx.type === 'deposit' &&
          tx.transactionData?.deposit?.type === 'cc' &&
          tx.status === 'error' && (
            <>
              <S.Icon src={depositIcon} />
              <span>You tried to add funds</span>
              <S.Bold style={{ color: '#DA1010' }}>(Transaction Failed)</S.Bold>
            </>
          )}
        {tx.type === 'deposit' &&
          tx.transactionData?.deposit?.type === 'circle' &&
          tx.status === 'success' && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* <S.Icon src={usdcIcon} /> */}
              <S.UsdcIcon />
              <span>You added funds by depositing </span>
              <S.Bold>USDC</S.Bold>
            </div>
          )}
        {tx.type === 'deposit' &&
          tx.transactionData?.deposit?.type === 'coinbase' &&
          tx.status === 'success' && (
            <>
              <S.Icon src={coinbaseIcon} />
              <span>You added funds by depositing </span>
              <S.Bold>
                $
                {tx.transactionData.deposit &&
                  parseFloat(tx.transactionData.deposit.amount).toFixed(2)}
              </S.Bold>
              <span>using</span>
              <S.Bold>Coinbase</S.Bold>
            </>
          )}
        {tx.type === 'deposit' &&
          tx.transactionData?.deposit?.type === 'circle' &&
          tx.status === 'pending' && (
            <>
              <S.UsdcIcon />
              <span>You added funds by </span>
              <S.Bold>USDC</S.Bold>
              <S.Bold>(Pending)</S.Bold>
            </>
          )}
        {tx.type === 'deposit' &&
          tx.transactionData?.deposit?.type === 'coinbase' &&
          tx.status === 'pending' && (
            <>
              <S.Icon src={coinbaseIcon} />
              <span>You added funds by depositing </span>
              <S.Bold>
                $
                {tx.transactionData.deposit &&
                  parseFloat(tx.transactionData.deposit.amount).toFixed(2)}
              </S.Bold>
              <span>using</span>
              <S.Bold>Coinbase</S.Bold>
              <S.Bold>(Pending)</S.Bold>
            </>
          )}
        {tx.type === 'deposit' &&
          tx.transactionData?.deposit?.type === 'circle' &&
          tx.status === 'error' && (
            <>
              <S.UsdcIcon />
              <span>You tried to add funds by depositing </span>
              <S.Bold>USDC</S.Bold>
              <S.Bold>(Transaction Failed)</S.Bold>
            </>
          )}
        {tx.type === 'deposit' &&
          tx.transactionData?.deposit?.type === 'coinbase' &&
          tx.status === 'error' && (
            <>
              <S.Icon src={coinbaseIcon} />
              <span>You tried to add funds by depositing </span>
              <S.Bold>${tx.transactionData.deposit.amount}</S.Bold>
              <span>using</span>
              <S.Bold>Coinbase</S.Bold>
              <S.Bold style={{ color: '#DA1010' }}>(Transaction Failed)</S.Bold>
            </>
          )}
      </S.TransactionDescription>
      <S.DateContainer>
        <S.TransactionDetail>
          <S.Date>
            {txCreatedAtDate.toLocaleDateString('en-US', options)}
          </S.Date>
        </S.TransactionDetail>
        <S.TransactionDetail>
          {tx.type === 'purchase' && tx.status === 'success' && (
            <S.Color color="#DA1010">
              - ${tx.transactionData?.cost?.totalCost.toFixed(2)}
            </S.Color>
          )}
          {tx.type === 'purchase' && tx.status === 'pending' && (
            <S.Color color="#9e9e9e">
              - ${tx.transactionData?.cost?.totalCost.toFixed(2)}
            </S.Color>
          )}
          {tx.type === 'purchase' && tx.status === 'error' && (
            <S.Color color="black" style={{ textDecoration: 'line-through' }}>
              ${tx.transactionData?.cost?.totalCost.toFixed(2)}
            </S.Color>
          )}
          {tx.type === 'deposit' && tx.status === 'success' && (
            <S.Color color="#00C44F">
              + $
              {tx.transactionData.deposit &&
                parseFloat(tx.transactionData?.deposit?.amount).toFixed(2)}
            </S.Color>
          )}
          {tx.type === 'deposit' && tx.status === 'pending' && (
            <S.Color color="#9e9e9e">
              + $
              {tx.transactionData.deposit &&
                parseFloat(tx.transactionData?.deposit?.amount).toFixed(2)}
            </S.Color>
          )}
          {tx.type === 'deposit' && tx.status === 'error' && (
            <S.Color color="black" style={{ textDecoration: 'line-through' }}>
              $
              {tx.transactionData.deposit &&
                parseFloat(tx.transactionData?.deposit?.amount).toFixed(2)}
            </S.Color>
          )}
          {tx.type === 'sale' && (
            <S.Color color="#00C44F">
              + ${tx.transactionData.cost?.finalPayout.toFixed(2)}
            </S.Color>
          )}
          {tx.type === 'royalty_fee' && (
            <S.Color color="#00C44F">
              + $
              {tx.transactionData.cost.royaltyFee &&
                tx.transactionData.cost.royaltyFee.toFixed(2)}
            </S.Color>
          )}
        </S.TransactionDetail>
      </S.DateContainer>

      <S.TransactionDetail>
        {showTxId ? (
          <S.UpArrow onClick={() => setShowTxId(!showTxId)} />
        ) : (
          <S.DownArrow onClick={() => setShowTxId(!showTxId)} />
        )}
      </S.TransactionDetail>
      {showTxId && (
        <S.TxIdContainer>
          Transaction ID: <S.TxId>{tx._id}</S.TxId>
        </S.TxIdContainer>
      )}
    </S.Container>
  );
};
export default Transaction;
