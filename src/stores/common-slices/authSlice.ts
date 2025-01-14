import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "@/api/auth";
import { RootState } from "../store";

export const me = createAsyncThunk("auth/me", async () => {
  const response = await authApi.me();
  return response.data.data;
});

export type UserInfo = {
  email: string;
  firstName: string;
  lastName: string;
};

interface authState {
  user: UserInfo | undefined;
}

const initialState: authState = {
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUserInfo: (state) => {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(me.fulfilled, (state, action) => {
      // Add user to the state array
      state.user = action.payload;
    });
  },
});

export const userInfo = (state: RootState) => state.auth;
export const { clearUserInfo } = authSlice.actions;
export default authSlice.reducer;
