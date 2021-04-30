import React from 'react';
import styled from 'styled-components/macro';
import { useState } from 'react';
import circleIcon from 'assets/img/icons/circle-icon-deposit.png';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Container } from '../index';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useHistory } from 'react-router-dom';
import { addFundsToUserWallet } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';
import CurrencyInput from 'react-currency-input-field';
import {
  getUserCardsThunk,
  removeUserCCThunk,
  addFundsThunk,
} from 'store/session/sessionThunks';

const S: any = {};

const AddFunds = () => {
  const userCard = useAppSelector((state) => state.session.userCards.cards[0]);
  const username = useAppSelector((state) => state.session.user.username);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const [amount, setAmount] = useState<string | undefined>('');
  const fundsBody = {
    email: userCard.metadata.email,
    phoneNumber: userCard.metadata.phoneNumber,
    amount: amount,
  };

  if (userCard.status !== 'complete') {
    history.push(`/wallet/${username}/addcreditcard`);
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
    const res = await dispatch(
      addFundsThunk({ token: userToken, data: fundsBody, cardId: userCard.id })
    );

    console.log(res.type.split('/')[5]);
    if (res.type.split('/')[5] !== 'rejected') {
      dispatch(getUserCardsThunk({ token: userToken }));
      history.push(`/wallet/${username}/deposit/success`);
    } else {
      history.push(`/wallet/${username}/deposit/error`);
    }
  };

  const removeCard = async () => {
    const userToken = await getAccessTokenSilently();
    dispatch(removeUserCCThunk({ token: userToken, id: userCard.id }));
  };

  const year = userCard.expYear.toString().slice(2, 4);
  const month = userCard.expMonth.toString();

  const expDate = month + '/' + year;

  return (
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
            name={'John Doe'}
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
          <S.RemoveCCButton onClick={removeCard}>Remove Card</S.RemoveCCButton>
        </S.Row>
        <div
          style={{
            paddingTop: '25px',
            borderBottom: '2px solid #ebebeb',
            paddingBottom: '10px',
          }}
        >
          <S.DollarSign>$</S.DollarSign>
          {/* <S.AmountInput
            placeholder="Enter Amount"
            onChange={(e) => setAmount(e.target.value)}
          /> */}
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
          <S.AddFundsButton onClick={addFunds}>Add Funds</S.AddFundsButton>
        </div>
      </S.ContentContainer>
    </Container>
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
`;

S.AddFundsButton = styled.button`
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
`;

export default AddFunds;
