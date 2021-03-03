import { logIn } from 'services/api/authService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface IAuthData {
  email: string;
  password: string;
}

interface IError {
  errorMessage: string;
}

interface IPayload {}

export const authUser = createAsyncThunk<
  // Return type of the payload creator
  IPayload,
  // First argument to the payload creator
  IAuthData,
  {
    rejectValue: IError;
  }
>('user/auth', async (data: any, thunkApi) => {
  try {
    const response = await logIn(data.email, data.password);
    return response.data;
  } catch (err) {
    return thunkApi.rejectWithValue({
      errorMessage: err.response.data.error_description,
    } as IError);
  }
});

interface UsersState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: null | string;
  user: { isAuthenticated: boolean; tokens: {} };
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    loading: 'idle',
    error: null,
    user: {
      isAuthenticated: false,
      tokens: {},
    },
  } as UsersState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authUser.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });
    builder.addCase(authUser.rejected, (state, action: any) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      if (action.payload) {
        state.error = action.payload.errorMessage;
      } else {
        state.error = action.error;
      }
    });
    builder.addCase(authUser.fulfilled, (state, { payload }) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
      }
      state.user.tokens = payload;
      state.user.isAuthenticated = true;
    });
  },
});

export default sessionSlice.reducer;
