import { createSlice } from '@reduxjs/toolkit';
import { authUser, registerUser } from './sessionThunks';

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
  reducers: {
    clearError: (state): void => { state.error = null },
    logout: (state) => {
      state.user.isAuthenticated = false;
      state.user.tokens = {};
    }
  },
  extraReducers: (builder) => {
    // AUTH
    builder.addCase(authUser.pending, (state) => {
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
    
    // REGISTER
    builder.addCase(registerUser.pending, (state) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });
    builder.addCase(registerUser.rejected, (state, action: any) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      if (action.payload) {
        state.error = action.payload.errorMessage || 'One or more fields have an error. Please check and try again.';
      } else {
        state.error = action.error;
      }
    });
  },
});

export const { clearError, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
