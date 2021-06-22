import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterRoomState } from "types/reduxState";

const initialState: RegisterRoomState = {
  largeBuildingType: null,
  buildingType: null,
  roomType: null,
  isSetUpForGuest: null,
  maximumGuestCount: 1,
  bedroomCount: 0,
  bedCount: 1,
  bedList: [],
  publicBedList: [],
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
    setMaximumGuestCount(state: any, actions: PayloadAction<number>) {
      state.maximumGuestCount = actions.payload;
      return state;
    },
    setBedroomCount(state: any, actions: PayloadAction<number>) {
      const bedroomCount = actions.payload;
      let { bedList } = state;

      state.bedroomCount = bedroomCount;

      if (bedroomCount < bedList.length) {
        // 초과 부분 잘라내기
        bedList = bedList.slice(0, bedroomCount);
      } else {
        // 나머지 채우기
        for (let i = bedList.length + 1; i < bedroomCount + 1; i += 1) {
          bedList.push({ id: i, beds: [] });
        }
      }
      state.bedList = bedList;

      return state;
    },
    setBedCount(state: any, actions: PayloadAction<number>) {
      state.bedCount = actions.payload;
      return state;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;
