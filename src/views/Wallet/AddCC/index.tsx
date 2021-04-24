import React from 'react';
import { useState } from 'react';
import circleIcon from 'assets/img/icons/circle-icon-deposit.png';
import exitIcon from 'assets/img/icons/exit-icon.png';
import { useAppSelector } from 'hooks/store';
import { createNewUserCC } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';
import { S } from './styles';

interface IValues {
  [key: string]: any;
}

interface IErrors {
  [key: string]: boolean;
}

const errors: any = {
  cardNumber: false,
  cvv: false,
  expDate: false,
  name: false,
  city: false,
  country: false,
  line1: false,
  line2: false,
  district: false,
  postalCode: false,
};

const errorsHelperText: any = {
  cardNumber: '',
  cvv: '',
  expMonth: '',
  expYear: '',
  name: '',
  city: '',
  country: '',
  line1: '',
  line2: '',
  district: '',
  postalCode: '',
};
const AddCC = () => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);
  const [fieldError, setFieldError] = useState(errors);
  const [helperText, setHelperText] = useState(errorsHelperText);
  const userEmail = useAppSelector((state) => state.session.user.email);
  const { getAccessTokenSilently } = useAuth0();

  const state: IValues = {
    cardNumber: '',
    cvv: '',
    expMonth: '',
    expYear: '',
    metadata: {
      email: userEmail,
      phoneNumber: '+14155555555',
    },
    billingDetails: {
      name: '',
      city: '',
      country: '',
      line1: '',
      line2: '',
      district: '',
      postalCode: '',
    },
  };

  const [cardInfo, setCardInfo] = useState<IValues | undefined>(state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('billingDetails')) {
      const keyName = name.split('-')[1];
      setCardInfo((prevState) => ({
        ...prevState,
        billingDetails: {
          ...prevState?.billingDetails,
          [keyName]: value,
        },
      }));
      return;
    }

    if (name === 'expDate') {
      const expMonth = value.split('/')[0];
      const expYear = value.split('/')[1];
      setCardInfo((prevState) => ({
        ...prevState,
        expYear: expYear,
        expMonth: expMonth,
      }));

      return;
    }
    setCardInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    return;
  };

  const validate = (ccInfo) => {
    if (ccInfo.cardNumber.length !== 16) {
      setFieldError((prevState) => ({
        ...prevState,
        cardNumber: true,
      }));
    } else {
      setFieldError((prevState) => ({
        ...prevState,
        cardNumber: false,
      }));
    }

    if (
      parseInt(ccInfo.expMonth, 10) > 12 ||
      parseInt(ccInfo.expMonth, 10) < 0
    ) {
      setFieldError((prevState) => ({
        ...prevState,
        expDate: true,
      }));
    } else {
      setFieldError((prevState) => ({
        ...prevState,
        expDate: false,
      }));
    }

    if (ccInfo.cvv.length !== 3) {
      setFieldError((prevState) => ({
        ...prevState,
        cvv: true,
      }));
    } else {
      setFieldError((prevState) => ({
        ...prevState,
        cvv: false,
      }));
    }
  };

  const handleSubmit = async () => {
    if (cardInfo === undefined) return;
    const userToken = await getAccessTokenSilently();
    cardInfo.expMonth = parseInt(cardInfo?.expMonth);
    cardInfo.expYear = parseInt(cardInfo?.expYear);
    validate(cardInfo);
    const res = await createNewUserCC(userToken, cardInfo);
  };

  return (
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
            <img src={exitIcon} alt="" />
          </S.Row>
        </S.HeaderContainer>
        <S.Row>
          <S.EnterDetailsText>Enter the card details below</S.EnterDetailsText>
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
            onChange={handleChange}
            value={cardInfo?.cardNumber}
          />
        </S.Row>
        <S.Row>
          <S.FormInput
            id="standard-basic"
            label="Exp Date MM/YYYY"
            size="medium"
            required
            name="expDate"
            error={fieldError?.expDate}
            helperText={fieldError?.expDate && 'Enter a valid date'}
            onChange={handleChange}
            type="text"
            value={cardInfo?.expDate}
          />
          <S.FormInput
            id="standard-basic"
            label="CVV"
            size="medium"
            required
            name="cvv"
            onChange={handleChange}
            error={fieldError?.cvv}
            helperText={fieldError?.cvv && 'Enter a valid cvv'}
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
          <S.Div>
            <S.Row>
              <S.FormInput
                id="standard-basic"
                label="Cardholder name"
                size="medium"
                fullWidth
                required
                name="billingDetails-name"
                onChange={handleChange}
                value={cardInfo?.billingDetails.name}
              />
            </S.Row>
            <S.Row>
              <S.FormInput
                id="standard-basic"
                label="Address Line 1"
                size="medium"
                fullWidth
                required
                onChange={handleChange}
                name="billingDetails-line1"
                value={cardInfo?.billingDetails.line1}
              />
            </S.Row>
            <S.Row>
              <S.FormInput
                id="standard-basic"
                label="Address Line 2"
                size="medium"
                fullWidth
                name="billingDetails-line2"
                onChange={handleChange}
                value={cardInfo?.billingDetails.line2}
              />
            </S.Row>
            <S.Row>
              <S.FormInput
                id="standard-basic"
                label="Postal Code"
                size="medium"
                fullWidth
                required
                onChange={handleChange}
                name="billingDetails-postalCode"
                value={cardInfo?.billingDetails.postalCode}
              />
            </S.Row>
            <S.Row>
              <S.FormInput
                id="standard-basic"
                label="City"
                size="medium"
                fullWidth
                required
                name="billingDetails-city"
                onChange={handleChange}
                value={cardInfo?.billingDetails.city}
              />
            </S.Row>
            <S.Row>
              <S.FormInput
                id="standard-basic"
                label="District"
                size="medium"
                fullWidth
                onChange={handleChange}
                name="billingDetails-district"
                value={cardInfo?.billingDetails.district}
              />
            </S.Row>
            <S.Row>
              <S.FormInput
                id="standard-basic"
                label="Country Code"
                size="medium"
                fullWidth
                required
                onChange={handleChange}
                name="billingDetails-country"
                value={cardInfo?.billingDetails.country}
              />
            </S.Row>
            {/* <S.Row>
              <S.FormInput
                id="standard-basic"
                label="Country Code"
                size="medium"
                fullWidth
                required
                onChange={handleChange}
              />
            </S.Row> */}
          </S.Div>
        ) : null}
        <S.ButtonContainer>
          <S.Button onClick={handleSubmit}>Add Card</S.Button>
        </S.ButtonContainer>
      </S.Box>
    </S.Container>
  );
};

export default AddCC;
