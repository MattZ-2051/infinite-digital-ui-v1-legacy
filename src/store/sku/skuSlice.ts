import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { getSkuTilesThunk } from './skuThunks';
import { Sku } from 'entities/sku';
import { skuFactory } from './skuFactory';

interface InitialListingState {
  skus: {
    data: Sku[];
    total: number;
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
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.skus = {
        data: payload.data,
        total: payload.total,
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
    });
  },
});

export default skuSlice.reducer;
