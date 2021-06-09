import countries from 'assets/location/country-states-OFAC-flag.json';
import { Link } from 'react-router-dom';
import { Country, District } from 'entities/country';

export interface Values {
  [key: string]: any;
}

export interface Errors {
  addressline1: boolean;
  city: boolean;
  country: boolean;
  district: boolean;
  postalCode: boolean;
}

export const errors: Errors = {
  addressline1: false,
  city: false,
  country: false,
  district: false,
  postalCode: false,
};

export interface RedeemInfo {
  addressLine1: string;
  addressLine2: string;
  district: District;
  postalCode: string;
  city: string;
  country: Country;
  shippingNotes: string;
}

export const payload: RedeemInfo = {
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

export const validate = (info: RedeemInfo, setFieldError) => {
  let error = false;
  if (info.addressLine1.length === 0) {
    setFieldError((prevState) => ({
      ...prevState,
      addressline1: true,
    }));
    error = true;
  } else {
    setFieldError((prevState) => ({
      ...prevState,
      addressline1: false,
    }));
  }
  if (info.city.length === 0) {
    setFieldError((prevState) => ({
      ...prevState,
      city: true,
    }));
    error = true;
  } else {
    setFieldError((prevState) => ({
      ...prevState,
      city: false,
    }));
  }

  if (info.postalCode.length === 0) {
    setFieldError((prevState) => ({
      ...prevState,
      postalCode: true,
    }));
    error = true;
  } else {
    setFieldError((prevState) => ({
      ...prevState,
      postalCode: false,
    }));
  }

  return error;
};

export const countriesList: Array<Country> = countries
  .filter((item) => item.ofac === 'false')
  .map((item) => ({
    name: item.name,
    iso2: item.iso2,
    states: item.states.map((state) => ({
      name: state.name,
      stateCode: state.state_code,
    })),
  }));