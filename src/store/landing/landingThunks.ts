import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeaturedSkuTiles } from 'services/api/sku';
import { getDropBoxes } from 'services/api/dropBoxService';
import { SkuWithFunctions } from 'entities/sku';

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
  SkuWithFunctions[],
  IPayloadParams,
  {
    rejectValue: IError;
  }
>('features/get', async (data, thunkApi) => {
  try {
    const response = await getFeaturedSkuTiles();
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});

export const getDropBoxesThunk = createAsyncThunk<
  IResponse,
  IPayloadParams,
  {
    rejectValue: IError;
  }
>('dropboxes/get', async (data, thunkApi) => {
  try {
    const response = await getDropBoxes();
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});
