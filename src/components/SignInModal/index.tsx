import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
// Material-UI
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import MuiTextField from '@material-ui/core/TextField';
import MuiInputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// Local
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { authUser } from 'store/session/sessionThunks';
import Modal from 'components/Modal';

interface IFormInput {
  username: string;
  password: string;
}

const SignInModal = () => {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm<IFormInput>();
  const formState = useAppSelector((state) => state.session.loading);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: IFormInput) => {
    const resultAction: any = await dispatch(
      authUser({ username: data.username, password: data.password })
    );

    if (authUser.fulfilled.match(resultAction)) {
      history.push('user-account');
    }
  };

  return (
    <Modal
      open
      onClose={() => {
        history.goBack();
      }}
    >
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Title>LOGIN</Title>

        <InputContainer>
          <InputLabel htmlFor="username">Username</InputLabel>
          <TextField
            id="outlined-full-width"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            name="username"
            inputRef={register({ required: true, maxLength: 20 })}
          />

          {errors.username && (
            <span style={{ color: 'red' }}>This field is required</span>
          )}
        </InputContainer>

        <InputContainer>
          <InputLabel htmlFor="username">Password</InputLabel>
          <TextField
            type="password"
            id="outlined-full-width"
            fullWidth
            margin="normal"
            variant="outlined"
            name="password"
            inputRef={register({
              required: true,
              minLength: {
                value: 6,
                message: 'Password must have at least 6 characters',
              },
            })}
            helperText={
              <ForgotPassword>
                <Link href="#" color="inherit" onClick={() => {}}>
                  Forgot Password?
                </Link>
              </ForgotPassword>
            }
          />
          {errors.password && (
            <span style={{ color: 'red' }}>{errors.password.message}</span>
          )}
        </InputContainer>

        <StyledButton
          disabled={formState === 'pending'}
          type="submit"
          variant="contained"
          size="large"
          disableElevation
          fullWidth
          startIcon={
            formState === 'pending' && (
              <CircularProgress size={20} color="secondary" disableShrink />
            )
          }
        >
          Enter
        </StyledButton>
      </form>
    </Modal>
  );
};

const Title = styled.h5`
  margin-bottom: 40px;
  text-align: center;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  && {
    min-height: 55px;
    background-color: #ffffff;
    color: #000000;
    border: 1px solid #000000 !important;
    padding: 7px 14px;
    &:hover {
      background-color: #000000 !important;
      border: 1px solid #ffffff !important;
      .label {
        color: black !important;
      }
      color: #ffffff;
    }
    & .label {
      color: #ffffff;
    }
  }
`;

const TextField = styled(MuiTextField)`
  && {
    .Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #8a8a8a;
    }

    .MuiFormLabel-root.Mui-focused {
      border-color: black;

      fieldset {
        border-color: black;
        .Mui-focused {
          border-color: black;
        }
      }
    }
  }
`;

const InputLabel = styled(MuiInputLabel)`
  && {
    font-size: 16px;
    color: black;
  }
`;

const ForgotPassword = styled.span`
  text-align: right;
  display: block;
`;

export default SignInModal;
