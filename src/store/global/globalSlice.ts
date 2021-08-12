import { createSlice } from '@reduxjs/toolkit';

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    loading: false,
  },
  reducers: {},
});

// export const {} = globalSlice.actions;
export default globalSlice.reducer;
