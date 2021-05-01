import { createSlice } from '@reduxjs/toolkit';
import {
  getUserInfoThunk,
  getUserCollectionThunk,
  getUserCardsThunk,
  updateUsernameThunk,
  deleteUser,
  createNewCCThunk,
  removeUserCCThunk,
  addFundsThunk,
} from './sessionThunks';

interface UsersState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: null | any;
  user: any;
  userCollection: any;
  userCards: any;
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    loading: 'idle',
    error: null,
    user: {},
    userCollection: [],
    userCards: {},
  } as UsersState,
  reducers: {
    clearError: (state): void => {
      state.error = null;
    },
    logout: (state) => {
      state.user = {};
      state.userCollection = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfoThunk.fulfilled, (state, { payload }) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.user = payload;
    });
    builder.addCase(getUserCollectionThunk.fulfilled, (state, { payload }) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      //('payload: ', payload)
      state.userCollection = payload;
    });
    builder.addCase(getUserCardsThunk.fulfilled, (state, { payload }) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.userCards = payload;
    });
    builder.addCase(updateUsernameThunk.fulfilled, (state, { payload }) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.user = payload;
    });
    builder.addCase(updateUsernameThunk.rejected, (state, { error }) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
    });
    builder.addCase(deleteUser, (state, {}) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.user = {};
    });
    builder.addCase(createNewCCThunk.fulfilled, (state, { payload }) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.userCards = payload;
    });
    builder.addCase(createNewCCThunk.rejected, (state, { error }) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
    });
    builder.addCase(removeUserCCThunk.fulfilled, (state, { payload }) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
    });
    builder.addCase(removeUserCCThunk.rejected, (state, { error }) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
    });
    builder.addCase(addFundsThunk.fulfilled, (state) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
    });
    builder.addCase(addFundsThunk.rejected, (state) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
    });
  },
});

export const { clearError } = sessionSlice.actions;
export default sessionSlice.reducer;
