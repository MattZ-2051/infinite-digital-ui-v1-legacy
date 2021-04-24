import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserInfo,
  getUserCollection,
  getUserCards,
} from 'services/api/userService';

// Return type of the payload creator
// TODO: REVIEW THIS
interface IResponse {
  test?: any;
}

// First argument to the payload creator
interface IPayloadParams {
  token: string;
  userId: string;
}

interface IPayloadToken {
  token: string;
}

// Custom errors
interface IError {
  errorMessage: string;
}

export const getUserInfoThunk = createAsyncThunk<
  IResponse,
  IPayloadToken,
  {
    rejectValue: IError;
  }
>('user/sub/:userId/get', async (data, thunkApi) => {
  try {
    const response = await getUserInfo(data.token);
    //console.log('response thunk :', response);
    //console.log('response thunkx data :', response.data);

    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});

export const getUserCollectionThunk = createAsyncThunk<
  IResponse,
  IPayloadParams,
  {
    rejectValue: IError;
  }
>('user/userCollection/get', async (data, thunkApi) => {
  try {
    const response = await getUserCollection(data.userId, data.token);
    console.log('response thunk :', response);
    console.log('response thunkx data :', response.data);

    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});

export const getUserCardsThunk = createAsyncThunk<
  IResponse,
  IPayloadToken,
  {
    rejectValue: IError;
  }
>('user/wallet/cards/get', async (data, thunkApi) => {
  try {
    const response = await getUserCards(data.token);
    console.log('response thunk :', response);
    console.log('response thunkx data :', response.data);

    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});
