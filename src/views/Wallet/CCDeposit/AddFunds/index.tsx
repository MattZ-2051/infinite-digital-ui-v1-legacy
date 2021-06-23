import { useState, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';
import circleIcon from 'assets/img/icons/circle-icon-deposit.png';
import 'react-credit-cards/es/styles-compiled.css';
import { Container, Padding } from '../styles';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {
  getUserCardsThunk,
  removeUserCCThunk,
  addFundsThunk,
  getUserInfoThunk,
} from 'store/session/sessionThunks';
import Toast from 'utils/Toast';
import * as S from './styles';

const zeros = ['0', '0.00', '.00', '', '00.00', '0.000', '0...00', '0.0..00'];

const AddFunds = () => {
  const userCard = useAppSelector((state) => state.session.userCards.cards[0]);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const [amount, setAmount] = useState<string | undefined>('');
  const [activeButton, setActiveButton] = useState<boolean>(false);
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

  useEffect(() => {
    if (zeros.includes(amount || '')) {
      setActiveButton(false);
    } else {
      setActiveButton(true);
    }
  }, [amount]);
  const addFunds = async () => {
    const userToken = await getAccessTokenSilently();
    fundsBody.amount = fundsBody.amount?.replace(',', '').replace(/^0+/, '');
    if (amount && zeros.includes(amount)) return;
    // if (isNaN(Number(fundsBody?.amount))) {
    //   Toast.error('An Error Occurred: Please enter a valid amount.');
    //   return;
    // }

    if (amount && parseFloat(amount.replaceAll(',', '')) > 1000) {
      Toast.error(
        'You can only deposit up to $1000 USD per credit card transaction'
      );
      return;
    }

    const res = await dispatch(
      addFundsThunk({ token: userToken, data: fundsBody, cardId: userCard.id })
    );
    if (res.type.split('/')[5] !== 'rejected') {
      dispatch(getUserCardsThunk({ token: userToken }));
      dispatch(getUserInfoThunk({ token: userToken }));
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
      }, 2000);
    }
  };

  const year = userCard.expYear.toString().slice(2, 4);
  const month = userCard.expMonth.toString();

  const expDate = (month.length === 1 ? '0' + month : month) + '/' + year;

  console.log('amount', amount);

  return (
    <S.Container>
      <S.ContentContainer>
        <S.Row
          style={{ borderBottom: '2px solid black', paddingBottom: '16px' }}
        >
          <S.HeaderDiv>
            <img src={circleIcon} alt="" />
            <S.HeaderText>Circle Payments</S.HeaderText>
          </S.HeaderDiv>
        </S.Row>
        <Padding>
          <S.AddFundsText>Add funds into your wallet</S.AddFundsText>
        </Padding>
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
            <S.ActiveText>(Active)</S.ActiveText>
          </div>
          <S.RemoveCCButton onClick={removeCard}>Remove Card</S.RemoveCCButton>
        </S.Row>
        <S.FeeReminderContainer>
          <S.FeeReminderText>
            Withdrawal of credit card deposits can be initiated 30 days after
            deposit.
          </S.FeeReminderText>
        </S.FeeReminderContainer>
        <S.AmountContainer>
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
        </S.AmountContainer>
        <Padding>
          {activeButton ? (
            <S.AddFundsButton
              onClick={addFunds}
              loadingComponentRender={() => (
                <PulseLoader color="#FFF" size={9} loading={true} />
              )}
            >
              Add Funds
            </S.AddFundsButton>
          ) : (
            <S.InactiveButton>Add Funds</S.InactiveButton>
          )}
        </Padding>
      </S.ContentContainer>
    </S.Container>
  );
};

export default AddFunds;
