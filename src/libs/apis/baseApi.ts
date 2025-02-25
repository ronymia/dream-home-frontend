import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../helpers/axios/axiosBaseQuery";
import { tagTypesList } from "../tag-types";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
