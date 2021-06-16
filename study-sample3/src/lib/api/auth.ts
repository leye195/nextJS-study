import { UserType } from "types/user";
import api from "./index";

interface SignUpAPIBody {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
}

export const signUpAPI = (body: SignUpAPIBody) =>
  api.post<UserType>("/api/auth/signup", body);
