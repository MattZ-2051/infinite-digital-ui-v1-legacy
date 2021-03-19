import { combineReducers } from 'redux'
import { configureStore, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import globalSlice from './global/globalSlice';
import sessionSlice from './session/sessionSlice';
import productSlice from './product/productSlice';
import listingSlice from './listing/listingSlice';
import dropBoxSlice from './dropBox/dropBoxSlice';

const rootReducer = combineReducers({
  global: globalSlice,
  session: sessionSlice,
  products: productSlice,
  listings: listingSlice,
  dropBoxes: dropBoxSlice
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
export default store;
