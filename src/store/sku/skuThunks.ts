import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSkuTiles } from 'services/api/sku';
import { Sku } from 'entities/sku';

// First argument to the payload creator
interface IPayloadParams {
  queryParams?: string;
  token?: string;
}

// Custom errors
interface IError {
  errorMessage: string;
}

export const getSkuTilesThunk = createAsyncThunk<
  Sku[],
  IPayloadParams,
  {
    rejectValue: IError;
  }
>('skus/get', async (payloadParams, thunkApi) => {
  const { token } = payloadParams || {};
  try {
    const data = await getSkuTiles({ token });
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
