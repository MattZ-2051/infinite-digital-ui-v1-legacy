import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
// Material-UI
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
// Local
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { authUser } from 'store/session/sessionThunks';
import { closeAllModals } from 'store/global/globalSlice';

interface IFormInput {
  username: string;
  password: string;
}

const SignInForm = () => {
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm<IFormInput>();
  const errorMessage = useAppSelector((state) => state.session.error);
  const formState = useAppSelector((state) => state.session.loading);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: IFormInput) => {
    const resultAction: any = await dispatch(
      authUser({ username: data.username, password: data.password })
    );

    if (authUser.fulfilled.match(resultAction)) {
      history.push('user-account');
      dispatch(closeAllModals());
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <div>
        {errors.username && (
          <span style={{ color: 'red' }}>This field is required</span>
        )}
        <StyledTextField
          id="outlined-full-width"
          label="Username"
          fullWidth
          margin="normal"
          // InputLabelProps={{
          //   shrink: true,
          // }}
          variant="outlined"
          name="username"
          inputRef={register({ required: true, maxLength: 20 })}
        />
      </div>

      <div>
        {errors.password && (
          <span style={{ color: 'red' }}>{errors.password.message}</span>
        )}
        <StyledTextField
          type="password"
          id="outlined-full-width"
          label="Password"
          fullWidth
          margin="normal"
          // InputLabelProps={{
          //   shrink: true,
          // }}
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
      </div>

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
  );
};

const StyledButton = styled(Button)`
  && {
    min-height: 55px;
    background-color: #000000;
    color: white;
    border: 1px solid white !important;
    padding: 7px 14px;
    &:hover {
      background-color: #ffffff !important;
      border: 1px solid black !important;
      .label {
        color: black !important;
      }
      color: black;
    }
    & .label {
      color: #ffffff;
    }
  }
`;

const StyledTextField = styled(TextField)`
  && {
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

const ForgotPassword = styled.span`
  text-align: right;
  display: block;
`;

export default SignInForm;
