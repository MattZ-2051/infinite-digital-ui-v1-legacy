import { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as S from '../../Transaction/styles';
import { TransactionDetail, TxIdContainer } from '../styles';
import { Container } from '../styles';
import { INewHbarDeposit } from '../index';

interface DateTimeOptions {
  year: 'numeric';
  month: 'short';
  day: 'numeric';
}

const dateOptions: DateTimeOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

const HbarTransaction = ({ dep }: { dep: INewHbarDeposit }): JSX.Element => {
  const depCreatedAtDate = dep.consensusAt as Date;
  const [showTxId, setShowTxId] = useState<boolean>(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Container>
      <S.TransactionDescription>
        <span>
          <span>
            {dep.status === 'error'
              ? 'You tried to add funds'
              : 'You added funds'}{' '}
          </span>
          <span> by depositing </span>
          <span style={{ fontWeight: 600, color: 'black' }}>
            {dep.depositAmount}
          </span>
          <span> using </span>
          <span style={{ fontWeight: 600, color: 'black' }}> Hbar </span>
        </span>
      </S.TransactionDescription>
      {!isSmall ? (
        <>
          <S.DateContainer>
            <S.Date>
              {depCreatedAtDate.toLocaleDateString('en-US', dateOptions)}
            </S.Date>
          </S.DateContainer>
          <TransactionDetail status={dep.status}>
            {dep.status === 'error' ? 'Transaction Failed' : dep.status}
          </TransactionDetail>
        </>
      ) : (
        <S.DateContainer>
          <S.Date>
            {depCreatedAtDate.toLocaleDateString('en-US', dateOptions)}
          </S.Date>
        </S.DateContainer>
      )}
      <S.TransactionDetail>
        {showTxId ? (
          <S.UpArrow onClick={() => setShowTxId((prev) => !prev)} />
        ) : (
          <S.DownArrow onClick={() => setShowTxId((prev) => !prev)} />
        )}
      </S.TransactionDetail>
      {showTxId && (
        <TxIdContainer>
          Transaction ID: <S.TxId>{dep.id}</S.TxId>
          {isSmall && (
            <TransactionDetail
              style={{ justifyContent: 'flex-start' }}
              status={dep.status}
            >
              Deposit Status: {dep.status}
            </TransactionDetail>
          )}
        </TxIdContainer>
      )}
    </Container>
  );
};
export default HbarTransaction;
