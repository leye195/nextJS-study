import { UserType } from "types/user";
import { BedType } from "./room";

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
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
};
