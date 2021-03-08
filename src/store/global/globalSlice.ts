import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    modals: [] as any,
  },
  reducers: {
    openModal: (state, action) => {
      state.modals.push(action.payload);
    },
    closeModal: (state, action) => {
      state.modals = state.modals.filter(
        (modal: { name: string; data: object }) =>
          modal.name !== action.payload.name
      );
    },
    closeAllModals: (state) => {
      state.modals = [];
    },
  },
});

export const { openModal, closeModal, closeAllModals } = globalSlice.actions;
export default globalSlice.reducer;
