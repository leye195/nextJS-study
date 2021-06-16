import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "types/user";
import { UserState } from "types/reduxState";

const initialState: UserState = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  birthday: "",
  isLoggedIn: false,
  profileImage: "",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedUser(state: any, action: PayloadAction<UserType>) {
      state = { ...action.payload, isLoggedIn: true };
      return state;
    },
  },
});

export const userActions = { ...user.actions };

export default user;
