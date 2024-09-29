/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import { getFromLocalStorage } from "../../utils/local-storage";
import { authKey } from "../../constants/storageKey";
import { IGenericErrorResponse, ResponseSuccessType } from "../../types/common";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// add request interceptor
instance.interceptors.request.use(
  // request config
  function (config) {
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  // request error
  function (error) {
    return Promise.reject(error);
  }
);

// add response interceptor
instance.interceptors.response.use(
  // @ts-ignore
  function (response) {
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  // response error
  async function (error) {
    const responseObject: IGenericErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong",
      errorMessages: error?.response?.data?.message,
    };
    // return responseObject;
    return Promise.reject(responseObject);
  }
);

export { instance };
