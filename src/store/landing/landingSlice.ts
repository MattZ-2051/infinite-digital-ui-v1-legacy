import { createSlice } from '@reduxjs/toolkit';
import { getFeaturesThunk, updateLandingLoading } from './landingThunks';
import { checkStatePending, showErrorToast } from 'utils/storeUtil';

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
      checkStatePending(state);
      state.features = payload;
    });
    builder.addCase(getFeaturesThunk.rejected, (state, { error }) => {
      checkStatePending(state);
      // If Thunk fails show Toast message with error
      showErrorToast(error.message);
    });
    builder.addCase(updateLandingLoading.fulfilled, (state, { payload }) => {
      state.loading = payload;
    });
  },
});

export default listingSlice.reducer;
