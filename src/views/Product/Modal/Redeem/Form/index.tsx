// Global
import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { redeemProduct } from 'services/api/productService';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import Toast from 'utils/Toast';

// Local
import * as S from './styles';
import {
  validate,
  errors,
  payload,
  countriesList,
  RedeemInfo,
  Errors,
} from './helper';

// Types
import { Country, District } from 'entities/country';

const link = (
  <>
    Item successfully redeemed, Learn more about redemption process{' '}
    <a href="https://support.suku.world/infinite/can-i-redeem-an-item">here</a>.
  </>
);

interface Props {
  setIsModalOpen: (a: boolean) => void;
}

const Form = ({ setIsModalOpen }: Props): JSX.Element => {
  const { getAccessTokenSilently } = useAuth0();

  const history = useHistory();
  const productId = history.location.pathname.split('/')[2];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fieldError, setFieldError] = useState<Errors>(errors);
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
    if (name === 'postalCode') {
      setInfo((prevState) => ({
        ...prevState,
        [name]: value.replace(/[^0-9A-Za-z]/g, ''),
      }));
      return;
    }

    if (name === 'name') {
      setInfo((prevState) => ({
        ...prevState,
        [name]: value.replace(/[^0-9A-Za-z-_\s]/g, ''),
      }));
      return;
    }

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
    info.country = selectedCount?.name || '';
    info.district = district || { name: '', stateCode: '' };
    const checkErrors = validate(info, setFieldError);
    if (checkErrors) return;
    const res = await redeemProduct(
      await getAccessTokenSilently(),
      info,
      productId
    );
    if (res.status === 200) {
      Toast.success(link);
      setIsModalOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } else {
      Toast.error('Whoops! Something went wrong please try again.');
      setIsModalOpen(false);
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

      {isOpen && (
        <S.InputContainer className="menu">
          <S.FormRow>
            <S.FormInput
              id="standard-basic"
              label="Name"
              size="medium"
              fullWidth
              name="name"
              onChange={handleChange}
              value={info?.name}
            />
          </S.FormRow>
          <S.FormRow>
            <S.FormInput
              id="standard-basic"
              label="Address Line 1"
              size="medium"
              fullWidth
              required
              name="addressLine1"
              onChange={handleChange}
              error={fieldError?.addressline1}
              value={info?.addressLine1}
              helperText={fieldError?.addressline1 && 'Enter a valid Address'}
            />
          </S.FormRow>
          <S.FormRow>
            <S.FormInput
              id="standard-basic"
              label="Address Line 2"
              size="medium"
              fullWidth
              name="addressLine2"
              onChange={handleChange}
              value={info?.addressLine2}
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
              error={fieldError?.postalCode}
              value={info?.postalCode}
              helperText={fieldError?.postalCode && 'Enter a valid Postal Code'}
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
              error={fieldError?.city}
              value={info?.city}
              helperText={fieldError?.city && 'Enter a valid City'}
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
            <InputLabel id="district">District</InputLabel>
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
              value={info?.shippingNotes}
            />
          </S.FormRow>
        </S.InputContainer>
      )}
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
