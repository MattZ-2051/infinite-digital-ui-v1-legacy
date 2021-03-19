import { createAsyncThunk } from '@reduxjs/toolkit';
import {getDropBoxes} from 'services/api/dropBoxService';

interface IResponse {}

// First argument to the payload creator
interface IPayloadParams {
  token: string;
}

// Custom errors
interface IError {
  errorMessage: string;
}

export const getDropBoxesThunk = createAsyncThunk<
  IResponse,
  IPayloadParams,
  {
    rejectValue: IError;
  }
>('dropboxes/get', async (data, thunkApi) => {
  try {
    const response = await getDropBoxes(data.token);
    return response.data;
  } catch(err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description
    } as IError);
  }
})
