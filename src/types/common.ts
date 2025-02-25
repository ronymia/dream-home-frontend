/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta: IMeta;
};

export interface IGenericErrorMessage {
  message: string;
  path: string | number;
}

export interface IGenericErrorResponse {
  status: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
}

export interface LoginResponse {
  user: {
    id: string;
    username?: string;
    email: string;
    permissions: [];
  };
  token: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export interface IUser {
  id: string;
  username?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  permissions: [];
}
