import { createSlice } from '@reduxjs/toolkit';
import { getProducts } from './productThunks';

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    loading: 'idle',
    error: null,
    products: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      console.log('Payload', payload)
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.products = payload;
    });
  },
});

export default productSlice.reducer;
