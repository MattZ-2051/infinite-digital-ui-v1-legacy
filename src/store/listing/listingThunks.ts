import { createAsyncThunk } from '@reduxjs/toolkit';
import { getListings } from 'services/api/listingService';

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

export const getListingsThunk = createAsyncThunk<
  IResponse,
  IPayloadParams,
  {
    rejectValue: IError;
  }
>('listings/get', async (data, thunkApi) => {
  try {
    const response = await getListings(data.token);
    //console.log('response thunk :', response);
    //console.log('response thunkx data :', response.data);

    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});
