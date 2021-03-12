import { createSlice } from '@reduxjs/toolkit';

interface UsersState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: null | string;
  user: Object,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    loading: 'idle',
    error: null,
    user: {
    },
  } as UsersState,
  reducers: {
    clearError: (state): void => { state.error = null },
    logout: (state) => {
      state.user = {};
    }
  },
  // extraReducers: (builder) => {
  // },
});

export const { clearError } = sessionSlice.actions;
export default sessionSlice.reducer;
