import React, { useMemo } from 'react';
import CustomDropdown from '../CustomDropdown';
import { Country, District } from 'entities/country';

interface IDistrictDropdownProps {
  onChange: (a: District | null) => any;
  country?: Country | null;
  value: District | null;
  placeholder: string;
  showValidations: boolean;
  errorMsg?: string;
}

const stateToCode = ({ stateCode }) => stateCode;
const stateToLabel = ({ name }) => name;

const DistrictDropdown = ({
  value,
  country,
  onChange,
  showValidations,
  errorMsg,
  ...props
}: IDistrictDropdownProps) => {
  const districts = useMemo(
    () => (country ? country?.states || [] : []),
    [country?.iso2]
  );
  return (
    <CustomDropdown<District>
      elemToKey={stateToCode}
      elemToLabel={stateToLabel}
      options={districts}
      value={value}
      onChange={onChange}
      showValidations={showValidations}
      errorMsg={errorMsg}
      {...props}
    />
  );
};

export default DistrictDropdown;
