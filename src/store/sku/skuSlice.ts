import { createSlice } from '@reduxjs/toolkit';
import { getSkusThunk } from './skuThunks';

export const listingSlice = createSlice({
  name: 'listings',
  initialState: {
    loading: 'idle',
    error: null,
    skus: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSkusThunk.fulfilled, (state, { payload }) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.skus = payload;
    });
  },
});

export default listingSlice.reducer;
