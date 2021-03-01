import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    modals: [] as any,
  },
  reducers: {
    openModal: (state, action) => {
      state.modals.push(action.payload);
    },
    closeModal: (state, action) => {
      state.modals = state.modals.filter(
        (modal) => modal.name !== action.payload.name
      );
    },
  },
});

export const { openModal, closeModal } = globalSlice.actions;
export default globalSlice.reducer;
