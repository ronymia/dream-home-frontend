import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { getFromLocalStorage } from "../../utils/local-storage";
import { authKey } from "../../constants/storageKey";
import { IGenericErrorResponse, ResponseSuccessType } from "../../types/common";

// Validate environment variable
const baseURL = import.meta.env.VITE_BACKEND_URL;
if (!baseURL) {
  throw new Error("Environment variable VITE_BACKEND_URL is not defined.");
}

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Add withCredentials to include cookies in requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 60000,
});

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers = config.headers || {}; // Ensure headers is defined
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle response and errors
axiosInstance.interceptors.response.use(
  // @ts-ignore
  (response: AxiosResponse): ResponseSuccessType => {
    return {
      ...(response?.data || null),
      meta: response?.data?.meta || null,
    };
    // return response.data;
  },
  async (error) => {
    const errorObject: IGenericErrorResponse = {
      status: error?.response?.status || 500,
      message:
        error?.response?.data?.message || "An unexpected error occurred.",
      errorMessages: error?.response?.data?.errorSources || null,
    };
    return Promise.reject(errorObject);
  }
);

export { axiosInstance };
