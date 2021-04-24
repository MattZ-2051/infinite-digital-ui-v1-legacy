import React from 'react';
import { useState } from 'react';
import circleIcon from 'assets/img/icons/circle-icon-deposit.png';
import exitIcon from 'assets/img/icons/exit-icon.png';
import { useAppSelector } from 'hooks/store';
import { createNewUserCC } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';
import { S } from './styles';
import { validate, errors, state, Values } from './helper';

const AddCC = () => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);
  const [fieldError, setFieldError] = useState(errors);
  const userEmail = useAppSelector((state) => state.session.user.email);
  const { getAccessTokenSilently } = useAuth0();
  const [cardInfo, setCardInfo] = useState<Values | undefined>(state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    if (name.includes('billingDetails')) {
      const keyName = name.split('-')[1];

      if (keyName === 'name') {
        setCardInfo((prevState) => ({
          ...prevState,
          billingDetails: {
            ...prevState?.billingDetails,
            [keyName]: value, //value.replace(/[^a-zA-Z]/gi, ''),
          },
        }));
        return;
      }
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

  const handleSubmit = async () => {
    if (cardInfo === undefined) return;
    const userToken = await getAccessTokenSilently();
    cardInfo.metadata.email = userEmail;
    cardInfo.expMonth = parseInt(cardInfo?.expMonth, 10);
    cardInfo.expYear = parseInt(cardInfo?.expYear, 10);
    const checkErrors = validate(cardInfo, setFieldError);
    if (checkErrors) {
      return;
    }
    const res = await createNewUserCC(userToken, cardInfo);
    console.log('backend res', res);
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
            label="Exp Date MM"
            size="medium"
            required
            name="expMonth"
            error={fieldError?.expMonth}
            helperText={fieldError?.expMonth && 'Enter a valid month format MM'}
            onChange={handleChange}
            type="number"
            value={cardInfo?.expMonth}
            style={{ paddingRight: '10px' }}
          />
          <S.FormInput
            id="standard-basic"
            label="Exp Date YYYY"
            size="medium"
            required
            name="expYear"
            error={fieldError?.expYear}
            helperText={fieldError?.expYear && 'Enter a valid year format YYYY'}
            onChange={handleChange}
            type="number"
            value={cardInfo?.expYear}
            style={{ paddingRight: '10px' }}
          />
          <S.FormInput
            id="standard-basic"
            label="CVV"
            size="medium"
            required
            name="cvv"
            onChange={handleChange}
            error={fieldError?.cvv}
            helperText={
              fieldError?.cvv && 'Enter a valid 3 digit card cvv number'
            }
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
                error={fieldError?.name}
                helperText={fieldError?.name && 'Enter a valid name'}
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
                error={fieldError?.line1}
                helperText={fieldError?.line1 && 'Enter a valid Address'}
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
                error={fieldError?.postalCode}
                helperText={
                  fieldError?.postalCode && 'Enter a valid postal code'
                }
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
                error={fieldError?.city}
                helperText={fieldError?.city && 'Enter a valid city'}
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
