import { createSlice } from "@reduxjs/toolkit";
import { getListingsThunk } from "./listingThunks";

export const listingSlice = createSlice({
  name: "listings",
  initialState: {
    loading: "idle",
    error: null,
    listings: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListingsThunk.fulfilled, (state, { payload }) => {
      if (state.loading === "pending") {
        state.loading = "idle";
      }
      //console.log('payload: ', payload)
      state.listings = payload;
    });
  },
});

export default listingSlice.reducer;
