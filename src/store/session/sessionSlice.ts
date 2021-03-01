import { AppDispatch } from "store/index";
import { logIn } from "services/api/authService";
import { createSlice } from "@reduxjs/toolkit";

export const fetchUsers = (email: string, password: string) => async (dispatch: AppDispatch) => {
  logIn(email, password)
    .then((res) => {
      dispatch(setUser(res.data));
    })
    .catch((err) => {
      // setError(err.response.data.error_description);
    });
};

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    value: 0,
    tokens: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.tokens = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = sessionSlice.actions;
export default sessionSlice.reducer;
