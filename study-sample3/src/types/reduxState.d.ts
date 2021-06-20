import { UserType } from "types/user";

export type CommonState = {
  validateMode: boolean;
};

export type UserState = UserType & {
  isLoggedIn: boolean;
};

export type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
};
