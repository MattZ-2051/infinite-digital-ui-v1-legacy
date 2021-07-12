import React from 'react';
import CustomDropdown from '../CustomDropdown';
import { Country } from 'entities/country';
import countries from 'assets/location/country-states-OFAC-flag.json';

interface ICountryDropdownProps {
  onChange: (a: Country | null) => any;
  value: Country | null;
  placeholder: string;
  showValidations: boolean;
  errorMsg?: string;
}

const countriesList = countries
  .filter((item) => item.ofac === 'false')
  .map((item) => ({
    name: item.name,
    iso2: item.iso2,
    states: item.states.map((state) => ({
      name: state.name,
      stateCode: state.state_code,
    })),
  }));

const CountryDropdown = ({
  value,
  onChange,
  ...props
}: ICountryDropdownProps) => {
  return (
    <CustomDropdown<Country>
      elemToKey={(country) => country.iso2}
      elemToLabel={(country) => country.name}
      options={countriesList}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default CountryDropdown;
