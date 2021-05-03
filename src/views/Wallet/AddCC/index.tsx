import { useState } from 'react';
import circleIcon from 'assets/img/icons/circle-icon-deposit.png';
import exitIcon from 'assets/img/icons/exit-icon.png';
import InputLabel from '@material-ui/core/InputLabel';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  createNewCCThunk,
  getUserCardsThunk,
} from 'store/session/sessionThunks';
import { useAuth0 } from '@auth0/auth0-react';
import { S } from './styles';
import { validate, errors, state, Values, handleChange } from './helper';
import { useHistory } from 'react-router-dom';
import Toast from 'components/Toast';
import MenuItem from '@material-ui/core/MenuItem';
import countriesList from 'assets/location/countries.json';

const AddCC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fieldError, setFieldError] = useState(errors);
  const loggedInUser = useAppSelector((state) => state.session.user);
  const { getAccessTokenSilently } = useAuth0();
  const [cardInfo, setCardInfo] = useState<Values | undefined>(state);
  const [formError, setFormError] = useState<boolean>(false);
  const [contryCode, selectedCountryCode] = useState<string>(
    countriesList[0].countryShortName
  );
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [toastStatus, setToastStatus] = useState<'error' | 'success'>(
    'success'
  );
  const [toastMessage, setToastMessage] = useState<string>('');

  const handleSubmit = async () => {
    //contryCode
    if (cardInfo === undefined) return;
    const userToken = await getAccessTokenSilently();
    cardInfo.metadata.email = loggedInUser.email;
    cardInfo.expMonth = parseInt(cardInfo?.expMonth, 10);
    cardInfo.expYear = parseInt(cardInfo?.expYear, 10);
    cardInfo.billingDetails.country = contryCode;
    const checkErrors = validate(cardInfo, setFieldError);
    if (checkErrors) {
      return;
    }
    const res = await dispatch(
      createNewCCThunk({ token: userToken, data: cardInfo })
    );

    if (res.type.split('/')[4] === 'rejected') {
      setFormError(true);
      setIsToastVisible(true);
      setToastStatus('error');
      setToastMessage('Error Occurred');
    } else {
      dispatch(getUserCardsThunk({ token: await getAccessTokenSilently() }));
      setIsToastVisible(true);
      setToastStatus('success');
      setToastMessage('Card Added');
      setTimeout(() => {
        history.push(`/wallet/${loggedInUser.username}/deposit/addfunds`);
      }, 2500);
    }
  };

  const clearState = () => {
    setCardInfo(state);
    setIsOpen(false);
  };

  const handleCountry = (event) => {
    const countryCode = event.target.value;
    selectedCountryCode(countryCode);
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
              value={cardInfo?.cardNumber}
            />
          </S.Row>
          <S.Row>
            <S.FormInput
              id="standard-basic"
              label="Exp Date MM"
              size="medium"
              required
              name="num-expMonth"
              error={fieldError?.expMonth}
              helperText={
                fieldError?.expMonth && 'Enter a valid month format MM'
              }
              onChange={(e) => handleChange(e, setCardInfo)}
              type="text"
              value={cardInfo?.expMonth}
              style={{ paddingRight: '10px' }}
            />
            <S.FormInput
              id="standard-basic"
              label="Exp Date YYYY"
              size="medium"
              required
              name="num-expYear"
              error={fieldError?.expYear}
              helperText={
                fieldError?.expYear && 'Enter a valid year format YYYY'
              }
              onChange={(e) => handleChange(e, setCardInfo)}
              type="text"
              value={cardInfo?.expYear}
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
                  onChange={(e) => handleChange(e, setCardInfo)}
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
                  onChange={(e) => handleChange(e, setCardInfo)}
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
                  onChange={(e) => handleChange(e, setCardInfo)}
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
                  onChange={(e) => handleChange(e, setCardInfo)}
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
                  onChange={(e) => handleChange(e, setCardInfo)}
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
                  onChange={(e) => handleChange(e, setCardInfo)}
                  name="billingDetails-district"
                  value={cardInfo?.billingDetails.district}
                />
              </S.Row>
              <br />
              <InputLabel id="country">Country</InputLabel>
              <S.Row>
                <S.DropDown
                  labelId="country"
                  name="billingDetails-country"
                  value={contryCode}
                  onChange={(value) => {
                    handleCountry(value);
                  }}
                >
                  {countriesList.map((el, index) => (
                    <MenuItem key={index} value={el.countryShortName}>
                      {el.countryName}
                    </MenuItem>
                  ))}
                </S.DropDown>
              </S.Row>
            </S.Div>
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
