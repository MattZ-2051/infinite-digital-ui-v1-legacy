import { configureStore, Action } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { ThunkAction } from "redux-thunk";

import globalSlice from './global/globalSlice';
import sessionSlice from './session/sessionSlice';

const store = configureStore({
  reducer: {
    global: globalSlice,
    session: sessionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
export default store;
