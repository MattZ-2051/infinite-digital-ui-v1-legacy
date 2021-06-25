import React from 'react';
import styled from 'styled-components/macro';
import TextField from '@material-ui/core/TextField';
import check from 'assets/svg/icons/check.svg';
import times from 'assets/svg/icons/times.svg';
import InputAdornment from '@material-ui/core/InputAdornment';

const FormInput = styled(TextField)`
  & .Mui-focused {
    color: black;
  }

  .MuiInput-underline:after {
    border-bottom: 2px solid black;
  }
`;

interface IFormInputValidatedProps {
  showValidations: boolean;
  errorMsg?: string;
}

export default function FormInputValidated(
  props: IFormInputValidatedProps = { errorMsg: '', showValidations: false }
) {
  const { showValidations, errorMsg, ...moreProps } = props;
  const hasError = Boolean(props.errorMsg);
  return (
    <FormInput
      {...moreProps}
      helperText={props.showValidations && props.errorMsg}
      error={props.showValidations && hasError}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {props.showValidations ? (
              <img src={hasError ? times : check} alt="validationStatus" />
            ) : (
              <></>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}
