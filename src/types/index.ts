export type TRegisterRequest = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: string;
};

export type TLoginRequest = {
  email: string;
  password: string;
};
