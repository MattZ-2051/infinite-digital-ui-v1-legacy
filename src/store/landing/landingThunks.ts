import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeaturedSkuTiles } from 'services/api/sku';
import { SkuWithFunctionsPopulated } from 'entities/sku';

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
  SkuWithFunctionsPopulated[],
  IPayloadParams,
  {
    rejectValue: IError;
  }
>('features/get', async (payloadParams, thunkApi) => {
  // TODO: is featured skutiles accurate for this store?
  try {
    const data = await getFeaturedSkuTiles();
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
