import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSkus } from 'services/api/sku';

 // Return type of the payload creator
interface IResponse {}

// First argument to the payload creator
interface IPayloadParams {
  token?: string,
  queryParams: string,
}

// Custom errors
interface IError {
  errorMessage: string;
}

export const getSkusThunk = createAsyncThunk<
  IResponse,
  IPayloadParams,
  {
    rejectValue: IError;
  }
>('skus/get', async (data, thunkApi) => {
  try {
    const response = await getSkus(data.queryParams);
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});
