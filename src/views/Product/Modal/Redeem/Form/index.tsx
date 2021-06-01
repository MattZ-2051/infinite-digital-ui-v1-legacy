// Global
import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import countries from 'assets/location/country-states-OFAC-flag.json';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { redeemProduct } from 'services/api/productService';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import Toast from 'utils/Toast';

// Local
import * as S from './styles';

// Types
import { Country, District } from 'entities/country';

interface RedeemInfo {
  addressLine1: string;
  addressLine2: string;
  district: District;
  postalCode: string;
  city: string;
  country: Country;
  shippingNotes: string;
}

const payload: RedeemInfo = {
  addressLine1: '',
  addressLine2: '',
  district: {
    name: '',
    stateCode: '',
  },
  postalCode: '',
  city: '',
  country: {
    name: '',
    iso2: '',
  },
  shippingNotes: '',
};

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

const Form = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const history = useHistory();
  const productId = history.location.pathname.split('/')[2];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [info, setInfo] = useState<RedeemInfo>(payload);
  const [selectedCount, setSelectedCountry] = useState<Country | undefined>(
    countriesList[0]
  );
  const [districtList, setDistrictList] = useState<Array<District>>(
    selectedCount?.states || []
  );
  const [district, setDistrict] = useState<District | undefined>();

  useEffect(() => {
    setDistrictList(selectedCount?.states || []);
  }, [selectedCount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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

  const handleSubmit = async () => {
    info.country = selectedCount || { name: '', iso2: '' };
    info.district = district || { name: '', stateCode: '' };
    const res = await redeemProduct(
      await getAccessTokenSilently(),
      info,
      productId
    );
    if (res.status !== 200) {
      Toast.error(res.data.message);
    } else {
      Toast.success(res.data.message);
    }
  };

  return (
    <S.FormContainer>
      <S.Dropdown onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        Shipping Information
        {isOpen ? (
          <S.ArrowUp className="arrow" />
        ) : (
          <S.ArrowDown className="arrow" />
        )}
      </S.Dropdown>

      {/* {isOpen && ( */}
      <CSSTransition in={isOpen} timeout={250} unmountOnExit classNames="fade">
        <S.InputContainer className="menu">
          <S.FormRow>
            <S.FormInput
              id="standard-basic"
              label="Address Line 1"
              size="medium"
              fullWidth
              required
              name="addressLine1"
              onChange={handleChange}
              //  onChange
              //  value
              //  error
              // helperText="Enter a valid address"
            />
          </S.FormRow>
          <S.FormRow>
            <S.FormInput
              id="standard-basic"
              label="Address Line 2"
              size="medium"
              fullWidth
              required
              name="addressLine2"
              onChange={handleChange}
              //  onChange
              //  value
              //  error
              // helperText="Enter a valid address"
            />
          </S.FormRow>
          <S.FormRow>
            <S.FormInput
              id="standard-basic"
              label="Postal code"
              size="medium"
              fullWidth
              required
              name="postalCode"
              onChange={handleChange}
              //  onChange
              //  value
              //  error
              // helperText="Enter a valid address"
            />
          </S.FormRow>
          <S.FormRow>
            <S.FormInput
              id="standard-basic"
              label="City"
              size="medium"
              fullWidth
              required
              name="city"
              onChange={handleChange}
              //  onChange
              //  value
              //  error
              // helperText="Enter a valid address"
            />
          </S.FormRow>
          <S.FormRow>
            <InputLabel id="country">Country</InputLabel>

            <S.DropDown
              labelId="country"
              name="country"
              value={selectedCount?.iso2 || ''}
              onChange={(value) => {
                handleCountry(value);
              }}
            >
              {countriesList.map((el) => (
                <MenuItem
                  key={el.iso2}
                  value={el.iso2}
                  style={{ zIndex: 9000 }}
                >
                  {el.name}
                </MenuItem>
              ))}
            </S.DropDown>
          </S.FormRow>
          <S.FormRow>
            <InputLabel id="district">State/Province</InputLabel>
            <S.DropDown
              labelId="district"
              name="district"
              value={district?.stateCode || ''}
              onChange={(event) => handleDistirct(event)}
            >
              {districtList?.map((el) => (
                <MenuItem key={el.stateCode} value={el?.stateCode || ''}>
                  {el.name}
                </MenuItem>
              ))}
            </S.DropDown>
          </S.FormRow>

          <S.FormRow>
            <S.FormInput
              id="standard-basic"
              label="Shipping Notes"
              size="medium"
              fullWidth
              name="shippingNotes"
              onChange={handleChange}
              //  onChange
              //  value
              //  error
              // helperText="Enter a valid address"
            />
          </S.FormRow>
        </S.InputContainer>
      </CSSTransition>
      {/* )} */}
      <S.DisclaimerText>
        Redeem this item and receive a copy on the following adress.Keep in mind
        that, by confirming this action, the digital and physical versions may
        suffer a price decrease.
      </S.DisclaimerText>
      <S.Center>
        <S.Button onClick={handleSubmit}>Redeem Now</S.Button>
      </S.Center>
    </S.FormContainer>
  );
};

export default Form;
