import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeaturedSkuTiles } from 'services/api/sku';
import { Sku } from 'entities/sku';

// Return type of the payload creator
interface IResponse {
  response?: any;
}

// First argument to the payload creator
interface IPayloadParams {
  token?: string;
}

// Custom errors
interface IError {
  errorMessage: string;
}

export const getFeaturesThunk = createAsyncThunk<
  Sku[],
  IPayloadParams,
  {
    rejectValue: IError;
  }
>('features/get', async (payloadParams, thunkApi) => {
  const { token } = payloadParams;
  try {
    const data = await getFeaturedSkuTiles({ token });
    if (!data) {
      throw new Error(`No data returned from API`);
    }
    return data;
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});
