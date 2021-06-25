import React, { useState } from 'react';
import { IPlaidAccount } from 'entities/plaidAccount';
import { PulseLoader } from 'react-spinners';
import AchAccountInfoBox from './AchAccountInfoBox';
import * as S2 from './styles';

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
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
      }}
    >
      <AchAccountInfoBox item={item} />
      <p style={{ textAlign: 'center', color: '#7D7D7D' }}>
        Lorem ipsum dolor consectetur adipiscing elit sit amet, consectetur
        adipiscing elit.
      </p>
      <S2.AmountContainer>
        <S2.DollarSign>$</S2.DollarSign>
        <S2.AmountInput
          placeholder="Enter Amount"
          decimalsLimit={2}
          fixedDecimalLength={2}
          value={valueAmount}
          prefix="$"
          onValueChange={(value) => {
            setAmount(value || '');
          }}
          maxLength={10}
          step={10}
          allowNegativeValue={false}
        />
        {valueSubmitted && errorAmount && <span>Enter an amount</span>}
      </S2.AmountContainer>
      <S2.Button
        type="button"
        onClick={() => {
          setSubmitted(true);
          if (errorAmount) {
            return;
          }
          return onWithdraw(item, valueAmount).catch(onError);
        }}
      >
        Send Money
      </S2.Button>
      <S2.SubButton type="button" onClick={onCancel}>
        Go Back
      </S2.SubButton>
    </div>
  );
};

AchAccountDepositForm.displayName = 'AchAccountDepositForm';

export default AchAccountDepositForm;
