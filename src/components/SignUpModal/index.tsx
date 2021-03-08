import { useRef } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
// Material-UI
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiTextField from '@material-ui/core/TextField';
import MuiInputLabel from '@material-ui/core/InputLabel';
// Local
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { registerUser } from 'store/session/sessionThunks';
import { authUser } from 'store/session/sessionThunks';
import Modal from 'components/Modal';

interface IFormInput {
  email: string;
  username: string;
  password: string;
  passwordRepeat: string;
}

const SignUpModal = () => {
  let history = useHistory();
  const { register, handleSubmit, errors, watch } = useForm<IFormInput>();
  const errorMessage = useAppSelector((state) => state.session.error);
  const formState = useAppSelector((state) => state.session.loading);
  const dispatch = useAppDispatch();
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async (data: IFormInput) => {
    const resultAction: any = await dispatch(
      registerUser({
        email: data.email,
        username: data.username,
        password: data.password,
      })
    );

    // Register completed -> autoLogin
    if (registerUser.fulfilled.match(resultAction)) {
      const resultAction: any = await dispatch(
        authUser({ username: data.username, password: data.password })
      );

      if (authUser.fulfilled.match(resultAction)) {
        history.push('user-account');
      }
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
        <Title>SIGN UP</Title>

        {/* {errorMessage && <Alert severity="error">{errorMessage}</Alert>} */}

        <InputContainer>
          <InputLabel htmlFor="email">Email address</InputLabel>
          <TextField
            id="outlined-full-width"
            fullWidth
            margin="normal"
            variant="outlined"
            name="email"
            inputRef={register({ required: true })}
          />
          {errors.email && (
            <span style={{ color: 'red' }}>This field is required</span>
          )}
        </InputContainer>

        <InputContainer>
          <InputLabel htmlFor="username">Username</InputLabel>
          <TextField
            id="outlined-full-width"
            fullWidth
            margin="normal"
            variant="outlined"
            name="username"
            inputRef={register({ required: true, maxLength: 20 })}
          />
          {errors.username && (
            <span style={{ color: 'red' }}>This field is required</span>
          )}
        </InputContainer>

        <InputContainer>
          <InputLabel htmlFor="password">Password</InputLabel>
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
          />
          {errors.password && (
            <span style={{ color: 'red' }}>{errors.password.message}</span>
          )}
        </InputContainer>

        <InputContainer>
          <InputLabel htmlFor="passwordRepeat">Repeat password</InputLabel>
          <TextField
            type="password"
            id="outlined-full-width"
            fullWidth
            margin="normal"
            variant="outlined"
            name="passwordRepeat"
            inputRef={register({
              validate: (value) =>
                value === password.current || 'The passwords do not match',
            })}
          />
          {errors.passwordRepeat && (
            <span style={{ color: 'red' }}>
              {errors.passwordRepeat.message}
            </span>
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
          Submit
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

export default SignUpModal;
