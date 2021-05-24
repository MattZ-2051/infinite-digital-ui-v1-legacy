import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { PulseLoader } from 'react-spinners';
import circleIcon from 'assets/img/icons/circle-icon-deposit.png';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Container } from '../index';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import CurrencyInput from 'react-currency-input-field';
import {
  getUserCardsThunk,
  removeUserCCThunk,
  addFundsThunk,
} from 'store/session/sessionThunks';
import Toast from 'utils/Toast';
import LoadingButton from 'components/Buttons/LoadingButton';

const S: any = {};

const AddFunds = () => {
  const userCard = useAppSelector((state) => state.session.userCards.cards[0]);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const [amount, setAmount] = useState<string | undefined>('');
  const fundsBody = {
    email: userCard.metadata.email,
    amount: amount,
  };

  if (userCard.status !== 'complete') {
    history.push(`/wallet/addcreditcard`);
  }

  const handleChange = (e) => {
    if (e.target.value.split('.').length !== 2) {
      setAmount(e.target.value + '.00');
    } else {
      setAmount(e.target.value);
    }
  };

  const addFunds = async () => {
    const userToken = await getAccessTokenSilently();
    fundsBody.amount = fundsBody.amount?.replace(',', '').replace(/^0+/, '');
    if (isNaN(Number(fundsBody?.amount))) {
      Toast.error('An Error Occurred: Please enter a valid amount.');
      return;
    }
    const res = await dispatch(
      addFundsThunk({ token: userToken, data: fundsBody, cardId: userCard.id })
    );
    if (res.type.split('/')[5] !== 'rejected') {
      dispatch(getUserCardsThunk({ token: userToken }));
      history.push(`/wallet/deposit/success`);
    } else {
      // FIXME: make async thunk typesafe to avoid any type
      Toast.error((res?.payload as any)?.errorMessage);
      history.push(`/wallet/deposit/error`);
    }
  };

  const removeCard = async () => {
    const userToken = await getAccessTokenSilently();
    const res = await dispatch(
      removeUserCCThunk({ token: userToken, id: userCard.id })
    );

    if (res.type.split('/')[5] === 'rejected') {
      Toast.error('An Error Occurred');
      return;
    } else {
      Toast.success('Card Successfully Removed');
      setTimeout(() => {
        history.push(`/wallet/addcreditcard`);
      }, 2500);
    }
  };

  const year = userCard.expYear.toString().slice(2, 4);
  const month = userCard.expMonth.toString();

  const expDate = (month.length === 1 ? '0' + month : month) + '/' + year;

  return (
    <>
      <Container>
        <S.ContentContainer>
          <S.Row
            style={{ borderBottom: '2px solid black', paddingBottom: '16px' }}
          >
            <S.HeaderDiv>
              <img src={circleIcon} alt="" />
              <S.HeaderText>Circle Payments</S.HeaderText>
            </S.HeaderDiv>
          </S.Row>
          <div style={{ paddingTop: '25px' }}>
            <S.AddFundsText>Add funds into your wallet</S.AddFundsText>
          </div>
          <S.CardContainer>
            <S.CreditCard
              name=" "
              expiry={expDate}
              focus=""
              number={`************${userCard.last4}`}
              preview={true}
              issuer={`${userCard.network}`}
            />
          </S.CardContainer>
          <S.Row>
            <div>
              <span>Credit Card</span>
              <span style={{ color: '#00c44f', paddingLeft: '5px' }}>
                (Active)
              </span>
            </div>
            <S.RemoveCCButton onClick={removeCard}>
              Remove Card
            </S.RemoveCCButton>
          </S.Row>
          <S.FeeReminderContainer>
            <S.FeeReminderText>
              Withdrawal of credit card deposits can be initiated 30 days after
              deposit.
            </S.FeeReminderText>
          </S.FeeReminderContainer>
          <div
            style={{
              paddingTop: '25px',
              borderBottom: '2px solid #ebebeb',
              paddingBottom: '10px',
            }}
          >
            <S.DollarSign>$</S.DollarSign>
            <S.AmountInput
              id="amount"
              name="amount-input"
              placeholder="Enter Amount"
              decimalsLimit={2}
              onChange={handleChange}
              maxLength={10}
              step={10}
              defaultValue={0.0}
              allowNegativeValue={false}
            />
          </div>
          <div style={{ padding: '25px 0' }}>
            <S.AddFundsButton
              onClick={addFunds}
              loadingComponentRender={() => (
                <PulseLoader color="#FFF" size={9} loading={true} />
              )}
            >
              Add Funds
            </S.AddFundsButton>
          </div>
        </S.ContentContainer>
      </Container>
    </>
  );
};

S.CreditCard = styled(Cards)`
  .rccs__card__background {
    background: black !important;
  }
`;

S.RemoveCCButton = styled.span`
  font-size: 16px;
  color: #7d7d7d;
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

S.DollarSign = styled.span`
  color: #7d7d7d;
  font-size: 16px;
  padding-right: 10px;
`;

S.AmountInput = styled(CurrencyInput)`
  border: none;
  font-size: 16px;
  :focus {
    outline: none;
  }
`;

S.CardContainer = styled.div`
  padding: 25px 0;
`;

S.AddFundsText = styled.span`
  font-size: 16px;
  color: #7d7d7d;
`;

S.FeeReminderContainer = styled.div`
  margin: 24px auto 20px;
  text-align: center;
`;

S.FeeReminderText = styled.div`
  color: #9e9e9e;
`;

S.FeeReminderIconContainer = styled.div`
  margin: 10px auto;
`;

S.HeaderText = styled.span`
  font-size: 22px;
  padding-left: 18px;
  font-weigth: 600;
`;

S.HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

S.ContentContainer = styled.div`
  width: 410px;
  // background-color: white;
  @media screen and (max-width: 430px) {
    width: 80%;
  }
`;

S.AddFundsButton = styled(LoadingButton)`
  width: 410px;
  height: 56px;
  border: none;
  background-color: black;
  color: white;
  border-radius: 35px;
  font-size: 20px;
  font-weigth: 600;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
  @media screen and (max-width: 430px) {
    width: 100%;
  }
`;

export default AddFunds;
