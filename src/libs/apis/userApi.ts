import { TagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

//
const USER_URL = "users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // REGISTRATION
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: `${USER_URL}/${payload?.id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [TagTypes.user, TagTypes.auth],
    }),
  }),
});

// auto-generated based on the defined endpoints
export const { useUpdateProfileMutation } = userApi;
