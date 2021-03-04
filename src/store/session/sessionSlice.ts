import { createSlice } from '@reduxjs/toolkit';
import { authUser } from './sessionThunks';

interface UsersState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: null | string;
  user: { isAuthenticated: boolean; tokens: {} };
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    loading: 'idle',
    error: null,
    user: {
      isAuthenticated: false,
      tokens: {},
    },
  } as UsersState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authUser.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });
    builder.addCase(authUser.rejected, (state, action: any) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });
    builder.addCase(authUser.fulfilled, (state, { payload }) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.user.tokens = payload;
      state.user.isAuthenticated = true;
    });
  },
});

export default sessionSlice.reducer;
