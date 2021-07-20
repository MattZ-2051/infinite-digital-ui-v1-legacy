import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { ProductWithFunctions } from 'entities/product';
import { User } from 'entities/user';
import { Wallet } from 'entities/wallet';
import { Card } from 'entities/card';
import { getProductsOwnedByUser } from 'services/api/productService';
import {
  INewCCPayloadParams,
  IAddFundsPayloadParams,
  IUsernamePayloadParams,
} from './Interface';
import {
  getMe,
  getMyCards,
  updateUsername,
  removeUserCC,
  createNewCC,
  addFundsToUserWallet,
  getBalances,
} from 'services/api/userService';
import {
  ITokenPayloadParams,
  IError,
  ITokenIdPayloadParams,
} from '../storeInterface';

export const getUserInfoThunk = createAsyncThunk<
  User,
  ITokenPayloadParams,
  {
    rejectValue: IError;
  }
>('users/me', async (payloadParams, thunkApi) => {
  try {
    const data = await getMe(payloadParams.token);
    const balances = await getBalances(payloadParams.token);

    return {
      ...data,
      balances,
    };
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});

export const getUserCollectionThunk = createAsyncThunk<
  { data: ProductWithFunctions[]; totalProducts: number },
  ITokenIdPayloadParams,
  {
    rejectValue: IError;
  }
>('products?owner=:user', async (payloadParams, thunkApi) => {
  try {
    const data = await getProductsOwnedByUser(
      payloadParams.id,
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
  ITokenPayloadParams,
  {
    rejectValue: IError;
  }
>('/wallet', async (payloadParams, thunkApi) => {
  try {
    const data = await getMyCards(payloadParams.token);

    return data;
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});

export const updateUsernameThunk = createAsyncThunk<
  User,
  IUsernamePayloadParams,
  {
    rejectValue: IError;
  }
>('/user/:id', async ({ token, username }, thunkApi) => {
  try {
    const response = await updateUsername(token, username);
    return response;
  } catch (e) {
    return thunkApi.rejectWithValue({
      errorMessage: e,
    } as IError);
  }
});

export const removeUserCCThunk = createAsyncThunk<
  void,
  ITokenIdPayloadParams,
  {
    rejectValue: IError;
  }
>('/wallet/cards/:id/delete', async ({ token, id }, thunkApi) => {
  try {
    await removeUserCC(token, id);
  } catch (e) {
    return thunkApi.rejectWithValue({
      errorMessage: e.message,
    } as IError);
  }
});

export const createNewCCThunk = createAsyncThunk<
  Card,
  INewCCPayloadParams,
  {
    rejectValue: IError;
  }
>('/wallet/cards/new', async ({ token, data }, thunkApi) => {
  try {
    const response = await createNewCC(token, data);
    return response;
  } catch (e) {
    return thunkApi.rejectWithValue({
      errorMessage: e.message,
    } as IError);
  }
});

export const addFundsThunk = createAsyncThunk<
  void,
  IAddFundsPayloadParams,
  {
    rejectValue: IError;
  }
>(
  '/wallet/cards/:cardId/payments`',
  async ({ token, data, cardId }, thunkApi) => {
    try {
      await addFundsToUserWallet(token, data, cardId);
    } catch (e) {
      return thunkApi.rejectWithValue({
        errorMessage: e.message,
        rawError: e,
      } as IError);
    }
  }
);
export const deleteUser = createAction('/user/delete');
