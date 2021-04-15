import { createSlice } from '@reduxjs/toolkit';
import { getFeaturesThunk, getDropBoxesThunk } from './landingThunks';

export const listingSlice = createSlice({
  name: 'landing',
  initialState: {
    loading: 'idle',
    error: null,
    features: {},
    dropBoxes: {},
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
    builder.addCase(getDropBoxesThunk.fulfilled, (state, {payload}) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }

      state.dropBoxes = payload;
    })
  },
});

export default listingSlice.reducer;
