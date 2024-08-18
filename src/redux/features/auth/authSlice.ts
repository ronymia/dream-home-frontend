import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi, LoginResponse } from "../../api/authApi";

export interface AuthState {
  user: null | {
    id: string;
    username: string;
    email: string;
  };
  token: string | null;
  isAuthenticated: boolean;
  userPermissions: string[];
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  userPermissions: JSON.parse(localStorage.getItem("userPermissions") || "[]"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Logs out the current user by setting the user and token to null.
     * @param {Object} state The current state of the reducer.
     * @returns {Object} The new state of the reducer.
     */
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      window.localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.userPermissions = action.payload.user?.permissions;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem(
            "userPermissions",
            JSON.stringify(action.payload.user.permissions ?? [])
          );
        }
      )
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
          state.userPermissions = action.payload.user?.permissions;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem(
            "userPermissions",
            JSON.stringify(action.payload.user.permissions ?? [])
          );
        }
      );
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
