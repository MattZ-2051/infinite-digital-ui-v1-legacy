import { createSlice } from "@reduxjs/toolkit";
import { getUserInfoThunk } from "./sessionThunks";

interface UsersState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: null | string;
  user: Object;
  userCollection: Object;
}

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    loading: "idle",
    error: null,
    user: {},
    userCollection: {},
  } as UsersState,
  reducers: {
    clearError: (state): void => {
      state.error = null;
    },
    logout: (state) => {
      state.user = {};
      state.userCollection = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfoThunk.fulfilled, (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
      }
      //console.log('payload: ', payload)
      state.user = payload;
    });
  },
});

export const { clearError } = sessionSlice.actions;
export default sessionSlice.reducer;
