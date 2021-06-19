import { UserType } from "types/user";
import api from "./index";

interface SignUpAPIBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
}

interface LoginAPIBody {
  email: string;
  password: string;
}

export const signUpAPI = (body: SignUpAPIBody) =>
  api.post<UserType>("/api/auth/signup", body);

export const loginAPI = (body: LoginAPIBody) =>
  api.post<UserType>("/api/auth/login", body);

export const meAPI = () => api.get<UserType>("/api/auth/me");

export const logoutAPI = () => api.delete("/api/auth/logout");
