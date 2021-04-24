import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'entities/user';
import { getUserInfo, getUserCollection } from 'services/api/userService';

// First argument to the payload creator
interface IPayloadParams {
  token: string;
  userId: string;
}

// Custom errors
interface IError {
  errorMessage: string;
}

export const getUserInfoThunk = createAsyncThunk<
  User,
  IPayloadParams,
  {
    rejectValue: IError;
  }
>('user/sub/:userId/get', async (data, thunkApi) => {
  try {
    const response = await getUserInfo(data.userId, data.token);
    //console.log('response thunk :', response);
    //console.log('response thunkx data :', response.data);

    return response.data[0];
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});

export const getUserCollectionThunk = createAsyncThunk<
  User,
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
