import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeaturedSkuTiles } from 'services/api/sku';
import { SkuWithTotal } from 'entities/sku';
import { ITokenPayloadParams, IError } from '../storeInterface';

export const getFeaturesThunk = createAsyncThunk<
  SkuWithTotal, // Return type of the payload creator
  ITokenPayloadParams, // First argument to the payload creator
  {
    // Types for ThunkAPI
    rejectValue: IError;
  }
>('features/get', async (payloadParams, thunkApi) => {
  const { token } = payloadParams || {};
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
