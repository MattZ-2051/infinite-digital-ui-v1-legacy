import React, { useCallback, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { Div, Row, FormInput, DropDown } from './styles';

import { Country, District } from 'entities/country';
import countries from 'assets/location/country-states-OFAC-flag.json';

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

export const validate = (billingDetails) => {
  return {
    name: billingDetails.name.split(' ').length < 2,
    city: billingDetails.city.length < 1,
    country: !billingDetails.country,
    line1: billingDetails.line1.length < 5,
    line2: false,
    district:
      !billingDetails.country ||
      (billingDetails.country.states.length > 0 && !billingDetails.district),
    postalCode: billingDetails.postalCode.length <= 3,
  };
};

export interface IBilling {
  name: string;
  city: string;
  country: Country | null;
  district: District | null;
  line1: string;
  line2: string;
  postalCode: string;
}

export type IBillingValidation = Record<keyof IBilling, boolean>;
export type IBillingExtraProps = Partial<Record<keyof IBilling, any>>;

// React.HTMLAttributes<HTMLDivElement>
// JSX.IntrinsicAttributes
export interface IBillingFormProps {
  validation?: IBillingValidation;
  extraProps?: IBillingExtraProps;
  onChange: (arg: (prevState: IBilling) => IBilling) => any | IBilling;
  value: IBilling;
  showValidations: boolean;
  style?: React.CSSProperties;
}

const BillingForm = ({
  showValidations,
  validation,
  value: valueIn,
  onChange,
  extraProps,
  ...props
}: IBillingFormProps) => {
  const districtList = valueIn.country?.states || [];
  useEffect(() => {
    onChange((prevState) => ({
      ...prevState,
      district: null,
    }));
  }, [valueIn.country]);
  const handleAnyChange = useCallback(
    (ev) => {
      const { name, value } = ev.target;
      const keyName = name;
      let newValue;
      if (keyName === 'name') {
        newValue = value.replace(/[^a-zA-Z\s]/gi, '');
      } else {
        newValue = value;
      }
      onChange((prevState) => ({
        ...prevState,
        // ToDo: Try to avoid this variable key assigns...
        [keyName]: newValue,
      }));
      return;
    },
    [onChange]
  );
  const fieldErrorIn = validation || {
    name: false,
    city: false,
    country: false,
    line1: false,
    line2: false,
    district: false,
    postalCode: false,
  };
  return (
    <Div {...props}>
      <Row>
        <FormInput
          label="Cardholder name"
          size="medium"
          fullWidth
          required
          name="name"
          onChange={handleAnyChange}
          value={valueIn.name}
          error={showValidations && fieldErrorIn.name}
          helperText={
            showValidations && fieldErrorIn.name && 'Enter a valid name'
          }
          {...extraProps?.name}
        />
      </Row>
      <Row>
        <FormInput
          label="Address Line 1"
          size="medium"
          fullWidth
          required
          onChange={handleAnyChange}
          name="line1"
          value={valueIn.line1}
          error={showValidations && fieldErrorIn.line1}
          helperText={fieldErrorIn.line1 && 'Enter a valid Address'}
          {...extraProps?.line1}
        />
      </Row>
      <Row>
        <FormInput
          label="Address Line 2"
          size="medium"
          fullWidth
          name="line2"
          onChange={handleAnyChange}
          value={valueIn.line2}
          {...extraProps?.line2}
        />
      </Row>
      <Row>
        <FormInput
          label="Postal Code"
          size="medium"
          fullWidth
          required
          onChange={handleAnyChange}
          name="postalCode"
          value={valueIn.postalCode}
          error={showValidations && fieldErrorIn.postalCode}
          helperText={
            showValidations &&
            fieldErrorIn.postalCode &&
            'Enter a valid postal code'
          }
          {...extraProps?.postalCode}
        />
      </Row>
      <Row>
        <FormInput
          label="City"
          size="medium"
          fullWidth
          required
          name="city"
          onChange={handleAnyChange}
          value={valueIn.city}
          error={showValidations && fieldErrorIn.city}
          helperText={
            showValidations && fieldErrorIn.city && 'Enter a valid city'
          }
          {...extraProps?.city}
        />
      </Row>
      <br />
      <InputLabel id="country">Country</InputLabel>
      <Row>
        <DropDown
          labelId="country"
          name="country"
          value={valueIn.country?.iso2 || ''}
          onChange={(event) => {
            // ToDo: Have to deselect district when country changes
            const selectedDistrict = countriesList.find(
              (item) => item.iso2 === event.target.value
            );
            onChange((prevState) => ({
              ...prevState,
              country: selectedDistrict || null,
            }));
          }}
          {...extraProps?.country}
        >
          {countriesList.map((el) => (
            <MenuItem key={el.iso2} value={el.iso2}>
              {el.name}
            </MenuItem>
          ))}
        </DropDown>
      </Row>
      <InputLabel id="state">State/Province</InputLabel>
      <Row>
        <DropDown
          labelId="state"
          name="state"
          value={valueIn.district?.stateCode || ''}
          onChange={(event) => {
            const selectedDistrict = districtList.find(
              (item) => item.stateCode === event.target.value
            );
            onChange((prevState) => ({
              ...prevState,
              district: selectedDistrict || null,
            }));
          }}
          {...extraProps?.district}
        >
          {districtList?.map((el) => (
            <MenuItem key={el.stateCode} value={el.stateCode}>
              {el.name}
            </MenuItem>
          ))}
        </DropDown>
      </Row>
    </Div>
  );
};

export default BillingForm;
