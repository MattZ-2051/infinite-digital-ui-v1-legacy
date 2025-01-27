import React, { useEffect, useState } from 'react';
import circleIcon from 'assets/img/icons/circle-icon-deposit.png';
import exitIcon from 'assets/img/icons/exit-icon.png';
import { PulseLoader } from 'react-spinners';
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
import Toast from 'utils/Toast';
import BillingForm from 'components/BillingForm';

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

  const lastUserCard = useAppSelector(
    (state) => state.session.userCards.cards[0]
  );
  useEffect(() => {
    if (lastUserCard) {
      const tt = setTimeout(() => {
        history.push(`/wallet/deposit/addfunds`);
      }, 2000);
      return () => clearTimeout(tt);
    }
  }, [lastUserCard?.id]);

  const handleSubmit = async () => {
    if (cardInfo === undefined) return;
    setFormSubmitted(true);
    const [fieldErrorsNew, checkErrors] = validate(cardInfo);
    setFieldError(fieldErrorsNew);
    if (checkErrors) {
      const { billingDetails } = fieldErrorsNew;
      Toast.error('Please fill out all required fields.');
      if (
        billingDetails.name === '' ||
        billingDetails.line1 ||
        billingDetails.postalCode ||
        billingDetails.city
      ) {
        setIsOpen(true);
      }
      return;
    }
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
    } else {
      setFormError(false);
      Toast.success('Congrats! Your Credit Card was successfully added.');
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
              inputProps={{ maxLength: 16 }}
              value={cardInfo?.cardNumber}
            />
          </S.Row>
          <S.Row>
            <S.FormInput
              id="standard-basic"
              label="Exp Date MM"
              size="medium"
              required
              inputProps={{ maxLength: 2 }}
              name="num-expMonth"
              error={fieldError?.expMonth}
              helperText={
                fieldError?.expMonth && 'Enter a valid month format MM'
              }
              onChange={(e) => handleChange(e, setCardInfo)}
              type="text"
              value={cardInfo?.expMonth || ''}
              style={{ paddingRight: '10px' }}
            />
            <S.FormInput
              id="standard-basic"
              label="Exp Date YYYY"
              size="medium"
              required
              name="num-expYear"
              inputProps={{ maxLength: 4 }}
              error={fieldError?.expYear || fieldError?.expYearPassed}
              helperText={
                (fieldError?.expYear && 'Enter a valid year format YYYY') ||
                (fieldError?.expYearPassed && 'Enter a valid year format YYYY')
              }
              onChange={(e) => handleChange(e, setCardInfo)}
              type="text"
              value={cardInfo?.expYear || ''}
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
              inputProps={{ maxLength: 3 }}
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
            <S.SLoadingButton
              onClick={handleSubmit}
              type="button"
              loadingComponentRender={() => <PulseLoader color="white" />}
            >
              Add Card
            </S.SLoadingButton>
          </S.ButtonContainer>
        </S.Box>
      </S.Container>
    </>
  );
};

export default AddCC;
