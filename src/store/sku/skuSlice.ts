import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { getSkuTilesThunk } from './skuThunks';
import { Sku } from 'entities/sku';
import { skuFactory } from './skuFactory';
import { checkStatePending, showErrorToast } from 'utils/storeUtil';

interface InitialListingState {
  skus: {
    data: Sku[];
    total: number;
    maxSkusMinPrice?: number;
  };
  loading: 'idle' | 'pending';
  currentRequestId: string | undefined;
  error: SerializedError | string | null;
}

export const skuSlice = createSlice({
  name: 'sku',
  initialState: <InitialListingState>{
    skus: {
      data: [skuFactory.build()],
      total: 0,
      maxSkusMinPrice: 20000,
    },
    loading: 'idle',
    currentRequestId: undefined,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSkuTilesThunk.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = action.meta.requestId;
      }
    });
    builder.addCase(getSkuTilesThunk.fulfilled, (state, { payload }) => {
      checkStatePending(state);
      state.skus = {
        data: payload.data,
        total: payload.total,
        maxSkusMinPrice: payload.maxSkusMinPrice,
      };
      state.currentRequestId = undefined;
    });
    builder.addCase(getSkuTilesThunk.rejected, (state, action) => {
      const { requestId } = action.meta;
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle';
        state.error = action.error;
        state.currentRequestId = undefined;
      }
      showErrorToast(action.error.message);
    });
  },
});

export default skuSlice.reducer;
