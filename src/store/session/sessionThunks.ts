import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductWithFunctions } from 'entities/product';
import { User } from 'entities/user';
import { Wallet } from 'entities/wallet';
import { getProductsOwnedByUser } from 'services/api/productService';
import { getMe, getMyCards } from 'services/api/userService';

// First argument to the payload creator
interface IPayloadParams {
  token: string;
  userId: string;
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
    console.log('response thunk :', response);
    console.log('response thunkx data :', response.data);

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
    const response = await getProductsOwnedByUser(data.userId, data.token);
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
    console.log('response thunk :', response);
    console.log('response thunkx data :', response);

    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});
