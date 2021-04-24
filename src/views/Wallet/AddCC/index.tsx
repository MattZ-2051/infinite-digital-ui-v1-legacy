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
  [key: string]: string;
}

const AddCC = () => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const userEmail = useAppSelector((state) => state.session.user.email);
  const { getAccessTokenSilently } = useAuth0();

  const state: IValues = {
    cardNumber: '',
    cvv: '',
    expMonth: 0,
    expYear: 0,
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
    setCardInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    return;
  };

  // const validateCreditCard = (value) => {
  //   if (validator.isCreditCard(value)) {
  //     // setErrorMessage('Valid CreditCard Number');
  //   } else {
  //     // setErrorMessage('Enter valid CreditCard Number!');
  //   }
  // };

  const handleSubmit = async () => {
    if (cardInfo === undefined) return;
    const userToken = await getAccessTokenSilently();
    cardInfo.expMonth = parseInt(cardInfo?.expMonth);
    cardInfo.expYear = parseInt(cardInfo?.expYear);
    const res = await createNewUserCC(userToken, cardInfo);
    console.log(res);
  };

  return (
    <S.Container>
      <S.ContentContainer>
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
            fullWidth
            required
            color="secondary"
            onChange={handleChange}
            value={cardInfo?.cardNumber}
          />
        </S.Row>
        <S.Row>
          <S.FormInput
            id="standard-basic"
            label="Exp Month"
            size="medium"
            required
            name="expMonth"
            type="number"
            style={{ paddingRight: '10px' }}
            onChange={handleChange}
          />
          <S.FormInput
            id="standard-basic"
            label="Exp Year"
            size="medium"
            required
            name="expYear"
            type="number"
            style={{ paddingRight: '10px' }}
            onChange={handleChange}
          />
          <S.FormInput
            id="standard-basic"
            label="CVV"
            size="medium"
            required
            name="cvv"
            onChange={handleChange}
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
      </S.ContentContainer>
    </S.Container>
  );
};

export default AddCC;
