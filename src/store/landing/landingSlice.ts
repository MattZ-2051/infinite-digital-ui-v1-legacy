import { createSlice } from '@reduxjs/toolkit';
import { getFeaturesThunk } from './landingThunks';

export const listingSlice = createSlice({
  name: 'landing',
  initialState: {
    loading: 'idle',
    error: null,
    features: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeaturesThunk.fulfilled, (state, { payload }) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      //console.log('payload: ', payload)
      state.features = payload;
    });
  },
});

export default listingSlice.reducer;
