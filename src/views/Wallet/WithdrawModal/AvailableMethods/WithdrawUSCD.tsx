import React, { useState } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { useAppSelector } from 'store/hooks';
import { postWithdrawalAmount } from 'services/api/walletService';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch } from 'store/hooks';
import { getUserInfoThunk } from 'store/session/sessionThunks';
import UsdcIcon from 'assets/img/icons/usdc-icon.png';
import * as S from '../styles';

interface IProps {
  setStatus: (value: number) => void;
  handleClose: () => void;
}

const WithdrawUSCD = ({ setStatus, handleClose }: IProps) => {
  const [valueAmount, setAmount] = useState<string>('');
  const [valueAddress, setValueAddress] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { getAccessTokenSilently } = useAuth0();
  const withdrawableBalance = useAppSelector(
    (state) => state.session.user.balances.ccWithdrawablesLock
  );
  const dispatch = useAppDispatch();

  const matchesMobile = useMediaQuery('(max-width:1140px)', { noSsr: true });

  const isValidAddress = /^0x[0-9a-f]{40}$/.test(valueAddress.toLowerCase());

  const errorValueAmount =
    (submitted && valueAmount === '') ||
    parseFloat(withdrawableBalance) < parseFloat(valueAmount)
      ? 'The amount can’t be higher than the widthrawable balance.'
      : '';

  const errorAddress =
    submitted && !isValidAddress
      ? 'Please enter a valid Etheruem mainnet address that accepts ERC20 deposits.'
      : '';

  const handleWithdrawalSubmit = async () => {
    try {
      setSubmitted(true);
      if (errorValueAmount === '' && errorAddress === '') {
        const token = await getAccessTokenSilently();
        const resp = await postWithdrawalAmount(
          token,
          valueAddress,
          valueAmount
        );
        dispatch(getUserInfoThunk({ token }));
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <S.BodyContent
      style={{
        padding: matchesMobile ? '0px' : '0px 56px 20px 56px',
      }}
    >
      <S.ContainerHeader>
        <img src={UsdcIcon} alt={'usdc-icon'} width={32} height={32} />
        <S.Header>USDC Withdrawal</S.Header>
      </S.ContainerHeader>
      <S.DepositFormContainer>
        <S.ContainerBalance>
          <S.Text color="#7d7d7d" fontSize="16px" fontWeight={400}>
            Withdrawable balance:
          </S.Text>
          <S.Text
            color="black"
            fontSize="16px"
            fontWeight={700}
            padding="0 5px 0 10px"
          >
            ${parseFloat(withdrawableBalance).toFixed(2)}
          </S.Text>
        </S.ContainerBalance>
        <S.Text
          color="#7D7D7D"
          fontSize="14px"
          fontWeight={400}
          padding="10px 0 0 0"
          textAlign="center"
        >
          (Excludes pending transactions and credit card payments less than 30
          days old).
        </S.Text>
        <S.Text
          color="#7d7d7d"
          fontSize="16px"
          fontWeight={400}
          textAlign="center"
          padding={'32px 0 0 0'}
        >
          Enter the amount you would like to withdraw
        </S.Text>
        <S.AmountContainer error={errorValueAmount}>
          <S.DollarSign error={errorValueAmount}>$</S.DollarSign>
          <S.AmountInput
            placeholder="Enter Amount"
            decimalsLimit={2}
            value={valueAmount}
            prefix="$"
            onValueChange={(value) => {
              setAmount(parseFloat(value || '0').toFixed(2));
            }}
            maxLength={10}
            step={10}
            allowNegativeValue={false}
            error={errorValueAmount}
          />
        </S.AmountContainer>
        {errorValueAmount !== '' && (
          <S.Text
            color="#DA1010"
            fontSize="14px"
            fontWeight={400}
            textAlign="center"
            padding={'5px 0 15px 0'}
          >
            {errorValueAmount}
          </S.Text>
        )}

        <S.Text
          color="#7d7d7d"
          fontSize="16px"
          fontWeight={400}
          textAlign="center"
          padding={'0 0 15px 0'}
        >
          Enter your wallet address
        </S.Text>

        <S.InputContainer error={errorAddress}>
          <S.CustomTextField
            type="text"
            placeholder="Enter USDC Address"
            onChange={(ev) => setValueAddress(ev.target.value)}
            defaultValue={valueAddress}
            name={'address'}
            error={errorAddress}
          />
        </S.InputContainer>
        {errorAddress !== '' && (
          <S.Text
            color="#DA1010"
            fontSize="14px"
            fontWeight={400}
            textAlign="center"
            padding={'5px 0 0 0'}
          >
            {errorAddress}
          </S.Text>
        )}
        <S.Text
          color="#7d7d7d"
          fontSize="14px"
          fontWeight={400}
          textAlign="center"
          padding={'32px 0 32px 0'}
        >
          This transaction will be completed within 24hrs. You will receive a
          notification emal once is submitted.
        </S.Text>
        <S.Button
          error={errorAddress || errorValueAmount}
          type="button"
          onClick={handleWithdrawalSubmit}
          disabled={errorAddress !== '' || errorValueAmount !== ''}
        >
          Submit Withdrawal Request
        </S.Button>
        <S.SubButton type="button" onClick={() => setStatus(0)}>
          Go Back
        </S.SubButton>
      </S.DepositFormContainer>
    </S.BodyContent>
  );
};

export default WithdrawUSCD;
