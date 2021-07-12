import { createSlice } from '@reduxjs/toolkit';
import { UsersState } from './Interface';
import { checkStatePending, showErrorToast } from 'utils/storeUtil';
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
import { stat } from 'fs';

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
    // Get User Info Thunk
    builder.addCase(getUserInfoThunk.fulfilled, (state, { payload }) => {
      checkStatePending(state);
      state.user = payload;
    });
    builder.addCase(getUserInfoThunk.rejected, (state, { error }) => {
      checkStatePending(state);
      showErrorToast(error.message);
    });

    // Get User Collection Thunk
    builder.addCase(getUserCollectionThunk.fulfilled, (state, { payload }) => {
      checkStatePending(state);
      state.userCollection = payload;
    });
    builder.addCase(getUserCollectionThunk.rejected, (state, { error }) => {
      checkStatePending(state);
      showErrorToast(error.message);
    });

    // Get User Card Info Thunk
    builder.addCase(getUserCardsThunk.fulfilled, (state, { payload }) => {
      checkStatePending(state);
      state.userCards = payload;
      state.user.balance = payload.balance.amount;
    });
    builder.addCase(getUserCardsThunk.rejected, (state, { error }) => {
      checkStatePending(state);
      showErrorToast(error.message);
    });

    // Update Username Thunk
    builder.addCase(updateUsernameThunk.fulfilled, (state, { payload }) => {
      checkStatePending(state);

      state.user.username = payload.username;
    });
    builder.addCase(updateUsernameThunk.rejected, (state, { error }) => {
      checkStatePending(state);
      showErrorToast(error.message);
    });

    // delete user and clear state, doesn't actaully ping API but clears user from store
    builder.addCase(deleteUser, (state, {}) => {
      checkStatePending(state);
      state.user = {};
    });

    // Create New CreditCard Thunk
    builder.addCase(createNewCCThunk.fulfilled, (state, { payload }) => {
      checkStatePending(state);

      state.userCards = payload;
    });
    builder.addCase(createNewCCThunk.rejected, (state, { error }) => {
      checkStatePending(state);
      showErrorToast(error.message);
    });

    // Removing User Credit Card
    builder.addCase(removeUserCCThunk.fulfilled, (state) => {
      checkStatePending(state);
      state.userCards.cards = [];
    });
    builder.addCase(removeUserCCThunk.rejected, (state, { error }) => {
      checkStatePending(state);
      showErrorToast(error.message);
    });

    // Adding funds to user account
    builder.addCase(addFundsThunk.fulfilled, (state) => {
      checkStatePending(state);
    });
    builder.addCase(addFundsThunk.rejected, (state, { error }) => {
      checkStatePending(state);
      showErrorToast(error.message);
    });
  },
});

export const { clearError } = sessionSlice.actions;
export default sessionSlice.reducer;
