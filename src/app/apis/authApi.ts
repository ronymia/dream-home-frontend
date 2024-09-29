import { LoginRequest, LoginResponse } from "../../types/common";
import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

//
const AUTH_URL = "auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // REGISTRATION
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [TagTypes.user],
    }),

    // LOGIN
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credential) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: credential,
      }),
      invalidatesTags: [TagTypes.user],
    }),
  }),
});

// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation } = authApi;
