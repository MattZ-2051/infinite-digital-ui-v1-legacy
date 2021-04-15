import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeaturedSkuTiles } from 'services/api/sku';

 // Return type of the payload creator
interface IResponse {}

// First argument to the payload creator
interface IPayloadParams {
 
}

// Custom errors
interface IError {
  errorMessage: string;
}

export const getFeaturesThunk = createAsyncThunk<
  IResponse,
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
