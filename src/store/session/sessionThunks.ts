import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductWithFunctions } from 'entities/product';
import { User } from 'entities/user';
import { Wallet } from 'entities/wallet';
import { getProductsOwnedByUser } from 'services/api/productService';
import {
  getMe,
  getMyCards,
  updateUsername,
  removeUserCC,
  createNewCC,
} from 'services/api/userService';

// First argument to the payload creator
interface IPayloadParams {
  token: string;
  id: string;
}

interface UsernamePayloadParams {
  token: string;
  userId: string;
  username: string;
}

interface TokenPayload {
  token: string;
}

// Custom errors
interface IError {
  errorMessage: string;
}

export const getUserInfoThunk = createAsyncThunk<
  User,
  TokenPayload,
  {
    rejectValue: IError;
  }
>('users/me', async (data, thunkApi) => {
  try {
    const response = await getMe(data.token);

    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});

export const getUserCollectionThunk = createAsyncThunk<
  ProductWithFunctions[],
  IPayloadParams,
  {
    rejectValue: IError;
  }
>('products?owner=:user', async (data, thunkApi) => {
  try {
    const response = await getProductsOwnedByUser(data.id, data.token);
    // console.log('response thunk :', response);
    // console.log('response thunkx data :', response);

    return response;
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});

export const getUserCardsThunk = createAsyncThunk<
  Wallet,
  TokenPayload,
  {
    rejectValue: IError;
  }
>('/wallet', async (data, thunkApi) => {
  try {
    const response = await getMyCards(data.token);

    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});

export const updateUsernameThunk = createAsyncThunk<
  User,
  UsernamePayloadParams,
  {
    rejectValue: IError;
  }
>('/user/:id', async ({ token, userId, username }, thunkApi) => {
  const response = await updateUsername(token, userId, username);
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      errorMessage: response.message,
    } as IError);
  }
  return response.data;
});

export const removeUserCCThunk = createAsyncThunk<
  Wallet,
  IPayloadParams,
  {
    rejectValue: IError;
  }
>('/wallet/cards/:id', async ({ token, id }, thunkApi) => {
  const response = await removeUserCC(token, id);
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      errorMessage: response.message,
    } as IError);
  }
  return response.data;
});

export const createNewCCThunk = createAsyncThunk<
  Wallet,
  IPayloadParams,
  {
    rejectValue: IError;
  }
>('/wallet/cards/:id', async ({ token, id }, thunkApi) => {
  const response = await removeUserCC(token, id);
  if (response.status !== 200) {
    return thunkApi.rejectWithValue({
      errorMessage: response.message,
    } as IError);
  }
  return response.data;
});
