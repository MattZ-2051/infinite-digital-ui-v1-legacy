import React, { useState } from 'react';
import { IPlaidAccount } from 'entities/plaidAccount';
import AchAccountInfoBox from './AchAccountInfoBox';
import * as S from './styles';
import { useEffect } from 'react';
import Toast from 'utils/Toast';
import { useAppSelector } from 'store/hooks';
import { useMediaQuery } from '@material-ui/core';

interface IAchAccountDepositFormProps {
  item: IPlaidAccount;
  onError: (Error) => any;
  onCancel: () => any;
  onWithdraw: (IPlaidAccount, amount: string) => Promise<any>;
}

const AchAccountDepositForm = ({
  item,
  onError,
  onWithdraw,
  onCancel,
}: IAchAccountDepositFormProps) => {
  const [valueAmount, setAmount] = useState<string>('');
  const [valueSubmitted, setSubmitted] = useState<boolean>(false);
  const errorAmount = !valueAmount;
  const withdrawableBalance = useAppSelector(
    (state) => state.session.user.balances.ccWithdrawablesLock
  );

  useEffect(() => {
    if (valueSubmitted && errorAmount) {
      Toast.error('Enter a valid amount.');
    }
  }, [valueSubmitted, errorAmount]);
  return (
    <S.DepositFormContainer>
      <AchAccountInfoBox item={item} />
      <S.Text
        color="#7d7d7d"
        fontSize="16px"
        fontWeight={500}
        textAlign="center"
        padding={'32px 0 0 0'}
      >
        Enter the amount you would like to withdraw
      </S.Text>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
        }}
      >
        <S.Text
          color="#7d7d7d"
          fontSize="16px"
          fontWeight={500}
          padding="16px 0 0 0"
        >
          Withdrawable balance:
        </S.Text>
        <S.Text
          color="color"
          fontSize="16px"
          fontWeight={600}
          padding="0 0 0 5px"
        >
          ${parseFloat(withdrawableBalance).toFixed(2)}
        </S.Text>
      </div>
      <S.Text
        color="#7d7d7d"
        fontSize="14px"
        fontWeight={500}
        padding="5px 0 16px 0"
      >
        (Excludes pending transactions)
      </S.Text>
      <S.AmountContainer>
        <S.DollarSign>$</S.DollarSign>
        <S.AmountInput
          placeholder="Enter Amount"
          decimalsLimit={2}
          value={valueAmount}
          prefix="$"
          onValueChange={(value) => {
            setAmount(value || '');
          }}
          maxLength={10}
          step={10}
          allowNegativeValue={false}
        />
      </S.AmountContainer>
      <S.Button
        type="button"
        onClick={() => {
          setSubmitted(true);
          if (errorAmount) {
            return;
          }
          return onWithdraw(item, parseFloat(valueAmount).toFixed(2)).catch(onError);
        }}
      >
        Deposit
      </S.Button>
      <S.SubButton type="button" onClick={onCancel}>
        Go Back
      </S.SubButton>
    </S.DepositFormContainer>
  );
};

AchAccountDepositForm.displayName = 'AchAccountDepositForm';

export default AchAccountDepositForm;
