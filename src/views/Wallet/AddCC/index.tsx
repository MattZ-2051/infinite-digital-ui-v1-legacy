import React, { useState } from 'react';
import circleIcon from 'assets/img/icons/circle-icon-deposit.png';
import exitIcon from 'assets/img/icons/exit-icon.png';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  createNewCCThunk,
  getUserCardsThunk,
} from 'store/session/sessionThunks';
import { useAuth0 } from '@auth0/auth0-react';
import { S } from './styles';
import {
  validate,
  initialErrorState,
  initialState,
  CardInfo,
  handleChange,
  CardErrors,
} from './helper';
import { useHistory } from 'react-router-dom';
import Toast from 'components/Toast';
import BillingForm from '../../../components/BillingForm';

const AddCC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fieldError, setFieldError] = useState<CardErrors>(initialErrorState);
  const [cardInfo, setCardInfo] = useState<CardInfo>(initialState);
  const [formError, setFormError] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const loggedInUser = useAppSelector((state) => state.session.user);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [toastStatus, setToastStatus] = useState<'error' | 'success'>(
    'success'
  );
  const [toastMessage, setToastMessage] = useState<string>('');

  const handleSubmit = async () => {
    if (cardInfo === undefined) return;
    const [fieldErrorsNew, checkErrors] = validate(cardInfo);
    setFieldError(fieldErrorsNew);
    if (checkErrors) {
      return;
    }
    setFormSubmitted(true);
    const userToken = await getAccessTokenSilently();
    const res = await dispatch(
      createNewCCThunk({
        token: userToken,
        data: {
          ...cardInfo,
          billingDetails: {
            ...cardInfo.billingDetails,
            country: cardInfo.billingDetails.country?.iso2 || '',
            district: cardInfo.billingDetails.district?.stateCode || '',
          },
          expMonth: parseInt(cardInfo?.expMonth, 10),
          expYear: parseInt(cardInfo?.expYear, 10),
          metadata: {
            email: loggedInUser.email,
          },
        },
      })
    );

    if (res.type.split('/')[4] === 'rejected') {
      setFormError(true);
      setIsToastVisible(true);
      setToastStatus('error');
      setToastMessage('Error Occurred');
    } else {
      setFormError(false);
      dispatch(getUserCardsThunk({ token: await getAccessTokenSilently() }));
      setIsToastVisible(true);
      setToastStatus('success');
      setToastMessage('Card Added');
      setTimeout(() => {
        history.push(`/wallet/deposit/addfunds`);
      }, 2000);
    }
  };

  const clearState = () => {
    setCardInfo(initialState);
    setFieldError(initialErrorState);
    setIsOpen(false);
    setFormError(false);
    setFormSubmitted(false);
    history.push('/wallet');
  };

  return (
    <>
      <Toast
        isVisible={isToastVisible}
        status={toastStatus}
        setIsVisible={setIsToastVisible}
      >
        {toastMessage}
      </Toast>
      <S.Container>
        <S.Box>
          <S.HeaderContainer>
            <S.Row
              style={{ borderBottom: '2px solid black', paddingBottom: '16px' }}
            >
              <S.HeaderDiv>
                <img src={circleIcon} alt="" />
                <S.HeaderText>Circle Payments</S.HeaderText>
              </S.HeaderDiv>
              <S.ExitIcon src={exitIcon} alt="" onClick={clearState} />
            </S.Row>
          </S.HeaderContainer>
          <S.Row>
            <S.EnterDetailsText>
              {formError ? 'An Error Occurred' : 'Enter the card details below'}
            </S.EnterDetailsText>
          </S.Row>
          <S.Row>
            <S.FormInput
              label="Credit Card Number"
              name="cardNumber"
              autoFocus
              fullWidth
              required
              color="secondary"
              error={fieldError?.cardNumber}
              helperText={
                fieldError?.cardNumber && 'Enter a valid credit card number'
              }
              onChange={(e) => handleChange(e, setCardInfo)}
              inputProps={{ maxlength: 16 }}
              value={cardInfo?.cardNumber}
            />
          </S.Row>
          <S.Row>
            <S.FormInput
              id="standard-basic"
              label="Exp Date MM"
              size="medium"
              required
              inputProps={{ maxlength: 2 }}
              name="num-expMonth"
              error={fieldError?.expMonth}
              helperText={
                fieldError?.expMonth && 'Enter a valid month format MM'
              }
              onChange={(e) => handleChange(e, setCardInfo)}
              type="text"
              value={cardInfo?.expMonth || null}
              style={{ paddingRight: '10px' }}
            />
            <S.FormInput
              id="standard-basic"
              label="Exp Date YYYY"
              size="medium"
              required
              name="num-expYear"
              inputProps={{ maxlength: 4 }}
              error={fieldError?.expYear || fieldError?.expYearPassed}
              helperText={
                (fieldError?.expYear && 'Enter a valid year format YYYY') ||
                (fieldError?.expYearPassed && 'Enter a valid year format YYYY')
              }
              onChange={(e) => handleChange(e, setCardInfo)}
              type="text"
              value={cardInfo?.expYear || null}
              style={{ paddingRight: '10px' }}
            />
            <S.FormInput
              id="standard-basic"
              label="CVV"
              size="medium"
              required
              name="cvv"
              onChange={(e) => handleChange(e, setCardInfo)}
              error={fieldError?.cvv}
              helperText={
                fieldError?.cvv && 'Enter a valid 3 digit card cvv number'
              }
              inputProps={{ maxlength: 3 }}
              value={cardInfo?.cvv}
            />
          </S.Row>
          <S.Row>
            <S.Dropdown onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
              Billing Details
              {isOpen ? (
                <S.ArrowUp className="arrow" />
              ) : (
                <S.ArrowDown className="arrow" />
              )}
            </S.Dropdown>
          </S.Row>
          {isOpen ? (
            <BillingForm
              showValidations={formSubmitted}
              validation={fieldError.billingDetails}
              onChange={(prevBillingDetails) => {
                setCardInfo((prevState) => ({
                  ...prevState,
                  billingDetails: prevBillingDetails(prevState.billingDetails),
                }));
              }}
              value={cardInfo?.billingDetails}
            />
          ) : null}
          <S.ButtonContainer>
            <S.Button onClick={handleSubmit}>Add Card</S.Button>
          </S.ButtonContainer>
        </S.Box>
      </S.Container>
    </>
  );
};

export default AddCC;
