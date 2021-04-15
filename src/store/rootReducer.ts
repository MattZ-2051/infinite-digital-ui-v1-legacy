import { combineReducers } from "@reduxjs/toolkit";
import globalReducer from "./global/globalSlice";

const rootReducer = combineReducers({ global: globalReducer });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
