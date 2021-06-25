import { useState } from 'react';
import coinbaseIcon from 'assets/img/icons/coinbase.png';
import depositIcon from 'assets/img/icons/Added-funds.png';
import dollarSign from 'assets/img/icons/dollarSign-icon.png';
import purchaseIcon from 'assets/img/icons/purchase-icon.png';
import { ITransaction } from 'entities/transaction';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
const Transaction = ({ tx }: IProps) => {
  const txCreatedAtDate = new Date(tx.createdAt);
  const [showTxId, setShowTxId] = useState<boolean>(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const options: DateTimeOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return (
    <S.Container>
      <S.TransactionDescription>
        {tx.type === 'purchase' && (
          <>
            <S.Icon src={purchaseIcon} />
            <span>
              {tx.status === 'success'
                ? 'You bought'
                : tx.status === 'pending'
                ? 'You bought from'
                : 'You tried buying from'}
            </span>
            <S.Link to={`/marketplace/${tx.transactionData?.sku[0]?._id}`}>
              {tx.transactionData.sku[0]?.name}
            </S.Link>
            <S.Link to={`/product/${tx.transactionData?.product[0]?._id}`}>
              #{tx.transactionData.product[0]?.serialNumber}
            </S.Link>
            <span>from</span>
            <S.Link to={`/collection/${tx.transactionData?.seller?.username}`}>
              @{tx.transactionData?.seller?.username}
            </S.Link>
            {tx.status === 'pending' ? (
              <S.Bold>(Pending)</S.Bold>
            ) : tx.status === 'error' ? (
              <S.Bold style={{ color: '#DA1010' }}>(Transaction Failed)</S.Bold>
            ) : null}
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
            <S.Link to={`/collection/${tx.transactionData?.buyer?.username}`}>
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
        {tx.type === 'deposit' && tx.transactionData?.deposit?.type === 'cc' && (
          <>
            <S.Icon src={depositIcon} />
            {(tx.status === 'success' && (
              <span>You added funds from your credit card</span>
            )) ||
              (tx.status === 'pending' && (
                <>
                  <span>You added funds from your credit card</span>
                  <S.Bold>(Pending)</S.Bold>
                </>
              )) || (
                <>
                  <span>You tried to add funds</span>
                  <S.Bold style={{ color: '#DA1010' }}>
                    (Transaction Failed)
                  </S.Bold>
                </>
              )}
          </>
        )}
        {tx.type === 'deposit' &&
          tx.transactionData?.deposit?.type === 'circle' && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <S.UsdcIcon />
              <span>
                {tx.status === 'success'
                  ? 'You added funds by depositing'
                  : tx.status === 'pending'
                  ? 'You added funds by'
                  : 'You tried to add funds by depositing'}
              </span>
              <S.Bold>USDC</S.Bold>
              {tx.status === 'pending' ? (
                <S.Bold>(Pending)</S.Bold>
              ) : tx.status === 'error' ? (
                <S.Bold>(Transaction Failed)</S.Bold>
              ) : null}
            </div>
          )}
        {tx.type === 'deposit' &&
          tx.transactionData?.deposit?.type === 'coinbase' && (
            <>
              <S.Icon src={coinbaseIcon} />
              <span>
                {tx.status === 'success'
                  ? 'You added funds by depositing'
                  : tx.status === 'pending'
                  ? 'You added funds by depositing'
                  : 'You tried to add funds by depositing'}
              </span>
              <S.Bold>
                $
                {tx.transactionData.deposit &&
                  parseFloat(tx.transactionData.deposit.amount).toFixed(2)}
              </S.Bold>
              <span>using</span>
              <S.Bold>Coinbase</S.Bold>
              {tx.status === 'pending' ? (
                <S.Bold>(Pending)</S.Bold>
              ) : tx.status === 'error' ? (
                <S.Bold>(Transaction Failed)</S.Bold>
              ) : null}
            </>
          )}
      </S.TransactionDescription>
      {!isSmall ? (
        <>
          <S.DateContainer>
            <S.Date>
              {txCreatedAtDate.toLocaleDateString('en-US', options)}
            </S.Date>
          </S.DateContainer>
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
            {tx.type === 'withdrawal' && (
              <S.Color color="#00C44F">withdraw</S.Color>
            )}
          </S.TransactionDetail>
        </>
      ) : (
        <S.TransactionDetail>
          <S.DateContainer>
            <S.Date>
              {txCreatedAtDate.toLocaleDateString('en-US', options)}
            </S.Date>
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
            {tx.type === 'withdrawal' && (
              <S.Color color="#00C44F">
                Withdraw
                {/*- ${parseFloat(tx.transactionData?.amount || '0').toFixed(2)}*/}
              </S.Color>
            )}
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
        </S.TxIdContainer>
      )}
    </S.Container>
  );
};
export default Transaction;
