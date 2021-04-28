import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { ProductWithFunctions } from 'entities/product';
import { User } from 'entities/user';
import { Wallet } from 'entities/wallet';
import { getProductsOwnedByUser } from 'services/api/productService';
import { getMe, getMyCards, updateUsername } from 'services/api/userService';

// First argument to the payload creator
interface IPayloadParams {
  token: string;
  userId: string;
}

interface UsernamePayloadParams {
  token: string;
  userId: string;
  username: string;
}

interface TokenPayload {
  token: string;
}

interface RejectWithValue<RejectValue> {
  readonly payload: RejectValue;
  name: string;
  message: string;
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
>('users/me', async (payloadParams, thunkApi) => {
  try {
    const data = await getMe(payloadParams.token);

    return data;
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
>('products?owner=:user', async (payloadParams, thunkApi) => {
  try {
    const data = await getProductsOwnedByUser(
      payloadParams.userId,
      payloadParams.token
    );

    return data;
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
>(
  '/wallet',
  async (
    payloadParams,
    thunkApi
  ): Promise<Wallet | RejectWithValue<IError>> => {
    try {
      const data = await getMyCards(payloadParams.token);

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue({
        errorMessage: err.response.data.error_description,
      } as IError);
    }
  }
);

export const updateUsernameThunk = createAsyncThunk<
  User,
  UsernamePayloadParams,
  {
    rejectValue: IError;
  }
>('/user/:id', async ({ token, userId, username }, thunkApi) => {
  try {
    const response = await updateUsername(token, userId, username);
    return response;
  } catch (e) {
    return thunkApi.rejectWithValue({
      errorMessage: e.message,
    } as IError);
  }
});

export const deleteUser = createAction('/user/delete');
