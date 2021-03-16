import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts as getProductsService } from 'services/api/productService';

 // Return type of the payload creator
interface IResponse {}

// First argument to the payload creator
interface IPayloadParams {
  token: string;
}

// Custom errors
interface IError {
  errorMessage: string;
}

export const getProducts = createAsyncThunk<
  IResponse,
  IPayloadParams,
  {
    rejectValue: IError;
  }
>('products/get', async (data, thunkApi) => { // async payloadCreator function()
  try {
    const response = await getProductsService(data.token);
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});
