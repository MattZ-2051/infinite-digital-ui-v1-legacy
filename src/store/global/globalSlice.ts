import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    modals: {},
  },
  reducers: {
    openModal: (state, action) => {
      state.modals = action.payload;
    },
  },
});

export const { openModal } = globalSlice.actions;
export default globalSlice.reducer;
