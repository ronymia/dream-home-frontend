import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

//
const AUTH_URL = "v1/auth";

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
    login: builder.mutation({
      query: (credential) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: credential,
      }),
      invalidatesTags: [TagTypes.user],
    }),

    // USER STATE CHANGE
    onAuthStateChange: builder.query({
      query: () => ({
        url: `${AUTH_URL}/onAuthStateChange`,
        method: "GET",
      }),
    }),
  }),
});

// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyOnAuthStateChangeQuery,
} = authApi;
