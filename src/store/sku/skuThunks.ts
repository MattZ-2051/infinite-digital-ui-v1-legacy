import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSkuTiles } from 'services/api/sku';
import { SkuWithTotal } from 'entities/sku';
import {IError} from "../storeInterface";

interface IPayloadParams {
  queryParams?: string;
  token?: string;
}

export const getSkuTilesThunk = createAsyncThunk<
  SkuWithTotal,
  IPayloadParams,
  {
    rejectValue: IError;
  }
>('skus/get', async (payloadParams, thunkApi) => {
  const { queryParams } = payloadParams || '';

  try {
    const data = await getSkuTiles({ queryParams });
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
