import { createSlice } from "@reduxjs/toolkit";

export const marketPlaceSlice = createSlice({
  name: "marketPlace",
  initialState: {
    loading: "idle",
    error: null,
    filters: {},
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default marketPlaceSlice.reducer;
