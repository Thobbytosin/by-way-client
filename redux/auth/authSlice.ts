import { AuthState } from "@/types/user.types";
import { createSlice } from "@reduxjs/toolkit";
import { PersistedState } from "redux-persist";

type CompleteAuthState = AuthState & { _persist: PersistedState };

const initialState: CompleteAuthState = {
  user: null,
  isAuthLoaded: false,
  _persist: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthLoaded = true;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
