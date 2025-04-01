import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegisration: (state, action) => {
      state.token = action.payload.token;
    },
    userLoggedIn: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state, action) => {
      state.token = "";
      state.user = "";
    },
    getUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { userRegisration, userLoggedIn, userLoggedOut, getUser } =
  authSlice.actions;

export default authSlice.reducer;
