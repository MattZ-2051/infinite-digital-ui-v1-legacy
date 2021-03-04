import { logIn, register } from 'services/api/authService';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface IAuthData {
  email?: string;
  username: string;
  password: string;
}

interface IError {
  errorMessage: string;
}

interface IPayload {}

export const authUser = createAsyncThunk<
  // Return type of the payload creator
  IPayload,
  // First argument to the payload creator
  IAuthData,
  {
    rejectValue: IError;
  }
>('user/auth', async (data: any, thunkApi) => {
  try {
    const response = await logIn(data.username, data.password);
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});

export const registerUser = createAsyncThunk<
  // Return type of the payload creator
  IPayload,
  // First argument to the payload creator
  IAuthData,
  {
    rejectValue: IError;
  }
>('user/register', async (data: any, thunkApi) => {
  try {
    const response = await register(data.email, data.password, data.username);
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});
