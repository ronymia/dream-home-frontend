import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../apis/authApi";
import { IUser } from "../../types/common";

export interface IAuth {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  permissions?: [];
}

const initialState: IAuth = {
  user: null,
  token: null,
  isAuthenticated: false,
  permissions: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
      state.token = payload?.token;
      state.isAuthenticated = true;
      state.permissions = [];
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.permissions = [];
      window.localStorage.clear(); // CLEAR LOCAL STORAGE DATA
    },
    setUserData: (
      state,
      {
        payload,
      }: PayloadAction<{
        name: keyof IUser;
        value: IUser[keyof IUser];
      }>
    ) => {
      if (state.user) {
        (state.user[payload.name] as typeof payload.value) = payload.value;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.token = payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", payload?.token);
        localStorage.setItem("user", JSON.stringify(payload?.user));
        localStorage.setItem(
          "userPermissions",
          JSON.stringify(payload?.user?.permissions ?? [])
        );
      }
    );
  },
});

export const { logOut, setUser, setUserData } = authSlice.actions;

export default authSlice.reducer;
