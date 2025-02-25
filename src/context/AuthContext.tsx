import React, { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../helpers/axios/axiosInstance";

interface IAuthContextProps {
  currentUser: any;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
  errors: any;
  login: (payload: { email: string; password: string }) => Promise<void>;
}

export const AuthContext = createContext<IAuthContextProps | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>(null);

  const login = async (payload: { email: string; password: string }) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(`api/v1/auth/login`, payload);
      if (response?.data) {
        setCurrentUser(response.data?.user);
        return response;
      }
    } catch (error) {
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAuthState = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `api/v1/auth/onAuthStateChange`
        );
        console.log({ first: response.data });
        setCurrentUser(response.data?.user);
      } catch (error) {
        setErrors(error?.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthState();
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, isLoading, errors, login }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
