import { useState } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import { useAppSelector, useAppDispatch } from "hooks/store";
import { fetchUsers } from 'store/session/sessionSlice';

export interface IProps {}

interface IFormInput {
  email: string;
  password: string;
}

const SignInForm: React.FC<IProps> = () => {
  const { register, handleSubmit, watch, errors } = useForm<IFormInput>();
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  
  //const onSubmit = (data) => alert(JSON.stringify(data));

  const onSubmit = (data: IFormInput) => {
    dispatch(fetchUsers(data.email, data.password));
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h1>Login</h1>

      {error && <Alert severity="error">{error}</Alert>}

      <div>
        <label htmlFor="email">Email Adress</label>
        <input
          type="text"
          name="email"
          ref={register({ required: true, maxLength: 20 })}
        />

        {errors.email && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="text" name="password" ref={register({ required: true })} />

        {errors.password && (
          <span style={{ color: "red" }}>This field is required</span>
        )}
      </div>

      <button>Forgot Password?</button>

      <StyledButton
        type="submit"
        variant="contained"
        size="large"
        disableElevation
      >
        Enter
      </StyledButton>
    </form>
  );
};

const StyledButton = styled(({ color, ...other }) => (
  <Button classes={{ label: "label" }} {...other} />
))`
  background-color: #000000 !important;
  border: 1px solid white !important;
  padding: 7px 14px;
  &:hover {
    background-color: #ffffff !important;
    border: 1px solid black !important;
    .label {
      color: black !important;
    }
  }
  & .label {
    color: #ffffff;
  }
`;

export default SignInForm;
