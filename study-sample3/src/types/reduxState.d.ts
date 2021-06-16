import { UserType } from "types/user";

export type CommonState = {
  validateMode: boolean;
};

export type UserState = UserType & {
  isLoggedIn: boolean;
};
