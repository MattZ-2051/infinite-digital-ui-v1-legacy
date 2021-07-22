import { useState, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';
import circleIcon from 'assets/img/icons/circle-icon-deposit.png';
import 'react-credit-cards/es/styles-compiled.css';
import { Padding } from '../styles';
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
import { config } from 'config';
import { ApiLogicError } from '../../../../utils/apiError';

const ccDepositLimit = parseInt(config.kycLimits.ccDepositLimit, 10);
const dailyDepositLimitMsgRe =
  /^You've deposited \$(?<depositByNow>\S+) USD in the past 24 hours\. This deposit would exceed the current allowable limit of \$(?<depositLimit>\S+) USD$/;
const weeklyDepositLimitMsgRe =
  /^You've deposited \$(?<depositByNow>\S+) USD in the past seven days\. This deposit would exceed the current allowable limit of \$(?<depositLimit>\S+) USD$/;

const zeros = ['0', '0.00', '.00', '', '00.00', '0.000', '0...00', '0.0..00'];

function showDepositToastMessage(depositErrMsg) {
  const matchDaily = dailyDepositLimitMsgRe.exec(depositErrMsg);
  if (matchDaily) {
    Toast.error(
      `You\'ve deposited $${matchDaily?.groups?.depositByNow} USD in the past 24 hours. The deposit would exceed the current allowable limit of $${matchDaily?.groups?.depositLimit} USD`
    );
    return;
  }
  const matchWeekly = weeklyDepositLimitMsgRe.exec(depositErrMsg);
  if (matchWeekly) {
    Toast.error(
      `You\'ve deposited $${matchWeekly?.groups?.depositByNow} USD in the past seven days. The deposit would exceed the current allowable limit of $${matchWeekly?.groups?.depositLimit} USD`
    );
    return;
  }
  Toast.error(`Other deposit error`);
}

const AddFunds = () => {
  const userCard = useAppSelector((state) => state.session.userCards.cards[0]);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const [amount, setAmount] = useState<string | undefined>('');
  const [activeButton, setActiveButton] = useState<boolean>(false);

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
    const lAmount = amount?.replace(',', '').replace(/^0+/, '');
    if (amount && zeros.includes(amount)) return;
    // if (isNaN(Number(lAmount))) {
    //   Toast.error('An Error Occurred: Please enter a valid amount.');
    //   return;
    // }

    if (amount && parseFloat(amount.replaceAll(',', '')) > ccDepositLimit) {
      Toast.error(
        `You can only deposit up to $${ccDepositLimit} USD per credit card transaction`
      );
      return;
    }

    const res = await dispatch(
      addFundsThunk({
        token: userToken,
        data: {
          email: userCard.metadata.email,
          amount: lAmount,
        },
        cardId: userCard.id,
      })
    );

    if (res.type.split('/').slice(-1)?.[0] !== 'rejected') {
      dispatch(getUserCardsThunk({ token: userToken }));
      dispatch(getUserInfoThunk({ token: userToken }));
      history.push(`/wallet/deposit/success`);
    } else {
      if (res?.payload?.rawError) {
        if (res.payload.rawError instanceof ApiLogicError) {
          if (res.payload.rawError.response.data?.message) {
            showDepositToastMessage(res.payload.rawError.response.data.message);
          } else {
            Toast.error(`Deposit Error`);
          }
        } else {
          Toast.error(`Deposit Error`);
        }
      } else {
        Toast.error(`Deposit Error`);
      }
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

  if (!userCard || userCard.status !== 'complete') {
    history.push(`/wallet/addcreditcard`);
  }
  if (!userCard) {
    return null;
  }

  const year = userCard.expYear.toString().slice(2, 4);
  const month = userCard.expMonth.toString();

  const expDate = (month.length === 1 ? '0' + month : month) + '/' + year;

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
