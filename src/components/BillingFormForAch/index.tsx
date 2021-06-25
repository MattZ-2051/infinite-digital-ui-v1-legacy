import React, { useCallback } from 'react';
import { Country, District } from 'entities/country';
import FormInputValidated from '../FormInputValidated';
import CountryDropdown from '../CountryDropdown';
import DistrictDropdown from '../DistrictDropdown';
import { Div, Row } from './styles';

export const isDistrictRequired = (country: Country) => {
  return Boolean(country?.states && country.states.length > 0);
};

export const validate = (billingDetails) => {
  return {
    name: billingDetails.name.split(' ').length < 2,
    city: billingDetails.city.length < 1,
    country: !billingDetails.country,
    line1: billingDetails.line1.length < 5,
    line2: false,
    district:
      billingDetails.country &&
      isDistrictRequired(billingDetails.country) &&
      !billingDetails.district,
    postalCode: billingDetails.postalCode.length <= 3,
    email: false,
    phone: false,
  };
};

export interface IBillingForAch {
  name: string;
  city: string;
  country: Country | null;
  district: District | null;
  line1: string;
  line2: string;
  postalCode: string;
  email: string;
  phone: string;
}

export type IBillingForAchValidation = Record<keyof IBillingForAch, boolean>;
export type IBillingForAchExtraProps = Partial<
  Record<keyof IBillingForAch, any>
>;

export interface IBillingFormForAchProps {
  validation?: IBillingForAchValidation;
  extraProps?: IBillingForAchExtraProps;
  onChange: (
    arg: (prevState: IBillingForAch) => IBillingForAch
  ) => any | IBillingForAch;
  value: IBillingForAch;
  showValidations: boolean;
  style?: React.CSSProperties;
}

const BillingFormForAch = ({
  showValidations,
  validation,
  value: valueIn,
  onChange,
  extraProps,
  ...props
}: IBillingFormForAchProps) => {
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
    email: false,
    phone: false,
  };
  return (
    <Div {...props}>
      <Row>
        <FormInputValidated
          label="Cardholder name"
          size="medium"
          fullWidth
          required
          name="name"
          onChange={handleAnyChange}
          value={valueIn.name}
          showValidations={showValidations}
          errorMsg={fieldErrorIn.name ? 'Enter a valid name' : ''}
          {...extraProps?.name}
        />
      </Row>
      <Row>
        <FormInputValidated
          label="Address Line 1"
          size="medium"
          fullWidth
          required
          onChange={handleAnyChange}
          name="line1"
          value={valueIn.line1}
          showValidations={showValidations}
          errorMsg={fieldErrorIn.line1 ? 'Enter a valid Address' : ''}
          {...extraProps?.line1}
        />
      </Row>
      <Row>
        <FormInputValidated
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
        <FormInputValidated
          label="Phone Number"
          size="medium"
          fullWidth
          name="phone"
          onChange={handleAnyChange}
          value={valueIn.phone}
          {...extraProps?.phone}
          style={{
            ...extraProps?.phone?.style,
            marginRight: 10,
          }}
        />
        <FormInputValidated
          label="Email"
          size="medium"
          fullWidth
          name="phone"
          onChange={handleAnyChange}
          value={valueIn.email}
          {...extraProps?.email}
          style={{
            ...extraProps?.email?.style,
            marginLeft: 10,
          }}
        />
      </Row>
      <Row>
        <FormInputValidated
          label="Postal Code"
          size="medium"
          fullWidth
          required
          onChange={handleAnyChange}
          name="postalCode"
          value={valueIn.postalCode}
          showValidations={showValidations}
          errorMsg={fieldErrorIn.postalCode ? 'Enter a valid postal code' : ''}
          {...extraProps?.postalCode}
          style={{
            ...extraProps?.postalCode?.style,
            marginRight: 10,
          }}
        />
        <FormInputValidated
          label="City"
          size="medium"
          fullWidth
          required
          name="city"
          onChange={handleAnyChange}
          value={valueIn.city}
          showValidations={showValidations}
          errorMsg={fieldErrorIn.city ? 'Enter a valid city' : ''}
          {...extraProps?.city}
          style={{
            ...extraProps?.city?.style,
            marginLeft: 10,
          }}
        />
      </Row>
      <br />
      <Row>
        {/*// ToDo: Have to deselect district when country changes*/}
        <CountryDropdown
          placeholder="Country *"
          name="country"
          value={valueIn.country}
          required
          onChange={(selected) => {
            onChange((prevState) => ({
              ...prevState,
              country: selected || null,
            }));
          }}
          showValidations={showValidations}
          errorMsg={fieldErrorIn.country ? 'Enter a country' : ''}
          {...extraProps?.country}
          style={{
            ...extraProps?.country?.style,
            marginRight: 10,
            width: '50%',
          }}
        />
        <DistrictDropdown
          placeholder={`State/Province${
            valueIn.country && isDistrictRequired(valueIn.country) ? ' *' : ''
          }`}
          name="state"
          value={valueIn.district}
          onChange={(selected) => {
            onChange((prevState) => ({
              ...prevState,
              district: selected,
            }));
          }}
          country={valueIn.country}
          showValidations={showValidations}
          errorMsg={fieldErrorIn.district ? 'Enter a district' : ''}
          {...extraProps?.district}
          style={{
            ...extraProps?.district?.style,
            marginLeft: 10,
            width: '50%',
          }}
        />
      </Row>
    </Div>
  );
};

export default BillingFormForAch;
