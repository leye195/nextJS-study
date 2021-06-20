import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterRoomState } from "types/reduxState";

const initialState: RegisterRoomState = {
  largeBuildingType: null,
  buildingType: null,
  roomType: null,
  isSetUpForGuest: null,
};

const registerRoom = createSlice({
  name: "registerRoom",
  initialState,
  reducers: {
    setLargeBuildingType(state: any, actions: PayloadAction<string>) {
      state.largeBuildingType = actions.payload;
    },
    setBuildingType(state: any, actions: PayloadAction<string>) {
      if (actions.payload === "") {
        state.buildingType = null;
      } else {
        state.buildingType = actions.payload;
      }
      return state;
    },
    setRoomType(
      state: any,
      actions: PayloadAction<"entire" | "public" | "private">,
    ) {
      state.roomType = actions.payload;
      return state;
    },
    setIsSetUpForGuest(state: any, actions: PayloadAction<boolean>) {
      state.isSetUpForGuest = actions.payload;
      return state;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;
