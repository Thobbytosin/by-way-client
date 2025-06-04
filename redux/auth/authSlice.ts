import { AuthState } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";
import { PersistedState } from "redux-persist";

type CompleteAuthState = AuthState & { _persist: PersistedState };

const initialState: CompleteAuthState = {
  user: null,
  _persist: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
