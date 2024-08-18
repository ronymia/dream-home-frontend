import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LoginResponse {
  user: {
    id: string;
    username: string;
    email: string;
    permissions: [];
  };
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    register: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
      // persis token on successful login
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // set token on local storage
          window.localStorage.setItem("token", data.token);
        } catch (error) {
          console.log("failed to login", error);
        }
      },
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credential) => ({
        url: "auth/login",
        method: "POST",
        body: credential,
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: LoginResponse }, meta, arg) =>
        response.data,
      // persis token on successful login
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          // set token on local storage
          window.localStorage.setItem("token", data.token);
        } catch (error) {
          console.log("failed to login", error);
        }
      },
    }),
  }),
});

// auto-generated based on the defined endpoints
export const { useRegisterMutation, useLoginMutation } = authApi;
