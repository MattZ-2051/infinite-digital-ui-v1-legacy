import { createSlice } from '@reduxjs/toolkit';
import { getDropBoxesThunk } from './dropBoxThunks';

export const dropBoxSlice = createSlice({
  name: 'dropBoxes',
  initialState: {
    loading: 'idle',
    error: null,
    dropBoxes: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDropBoxesThunk.fulfilled, (state, {payload}) => {
      console.log('Payload', payload)
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }

      state.dropBoxes = payload;
    })
  }
})

export default dropBoxSlice.reducer
