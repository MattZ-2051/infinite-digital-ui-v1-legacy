import { useState, useEffect } from 'react';
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
import countries from 'assets/location/country-states-OFAC-flag.json';
import { Country, District } from 'entities/country';

const countriesList: Array<Country> = countries
  .filter((item) => item.ofac === 'false')
  .map((item) => ({
    name: item.name,
    iso2: item.iso2,
    states: item.states.map((state) => ({
      name: state.name,
      stateCode: state.state_code,
    })),
  }));

const AddCC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fieldError, setFieldError] = useState(errors);
  const loggedInUser = useAppSelector((state) => state.session.user);
  const { getAccessTokenSilently } = useAuth0();
  const [cardInfo, setCardInfo] = useState<Values | undefined>(state);
  const [formError, setFormError] = useState<boolean>(false);
  const [country, setSelectedCountry] = useState<Country | undefined>(
    countriesList[0]
  );
  const [districtList, setDistrictList] = useState<Array<District>>(
    country?.states || []
  );
  const [district, setDistrict] = useState<District | undefined>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [toastStatus, setToastStatus] = useState<'error' | 'success'>(
    'success'
  );
  const [toastMessage, setToastMessage] = useState<string>('');

  useEffect(() => {
    setDistrictList(country?.states || []);
  }, [country]);

  const handleSubmit = async () => {
    if (cardInfo === undefined) return;
    const userToken = await getAccessTokenSilently();
    cardInfo.metadata.email = loggedInUser.email;
    cardInfo.expMonth = parseInt(cardInfo?.expMonth, 10);
    cardInfo.expYear = parseInt(cardInfo?.expYear, 10);
    cardInfo.billingDetails.country = country?.iso2;
    cardInfo.billingDetails.district = district?.stateCode;
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
        history.push(`/wallet/deposit/addfunds`);
      }, 2000);
    }
  };

  const clearState = () => {
    setCardInfo(state);
    setIsOpen(false);
    history.push('/wallet');
  };

  const handleCountry = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(
      countriesList.find((item) => item.iso2 === selectedCountry)
    );
  };

  const handleDistirct = (event) => {
    const selectedDistrict = event.target.value;
    setDistrict(
      districtList.find((item) => item.stateCode === selectedDistrict)
    );
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
              <br />
              <InputLabel id="country">Country</InputLabel>
              <S.Row>
                <S.DropDown
                  labelId="country"
                  name="billingDetails-country"
                  value={country?.iso2 || ''}
                  onChange={(value) => {
                    handleCountry(value);
                  }}
                >
                  {countriesList.map((el) => (
                    <MenuItem key={el.iso2} value={el.iso2}>
                      {el.name}
                    </MenuItem>
                  ))}
                </S.DropDown>
              </S.Row>
              <InputLabel id="state">State/Province</InputLabel>
              <S.Row>
                <S.DropDown
                  labelId="state"
                  name="billingDetails-state"
                  value={district?.stateCode || ''}
                  onChange={(event) => handleDistirct(event)}
                >
                  {districtList?.map((el) => (
                    <MenuItem key={el.stateCode} value={el?.stateCode || ''}>
                      {el.name}
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
