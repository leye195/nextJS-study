import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterRoomState } from "types/reduxState";
import { BathRoomType, BedType } from "types/room";

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
  bathroomCount: 1,
  bathroomType: null,
  // location
  country: "",
  city: "",
  district: "",
  streetAddress: "",
  detailAddress: "",
  postcode: "",
  latitude: 0,
  longitude: 0,
  amentities: [],
  conveniences: [],
  photos: [],
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
      action: PayloadAction<"entire" | "public" | "private">,
    ) {
      state.roomType = action.payload;
      return state;
    },
    setIsSetUpForGuest(state: any, action: PayloadAction<boolean>) {
      state.isSetUpForGuest = action.payload;
      return state;
    },
    setMaximumGuestCount(state: any, action: PayloadAction<number>) {
      state.maximumGuestCount = action.payload;
      return state;
    },
    setBedroomCount(state: any, action: PayloadAction<number>) {
      const bedroomCount = action.payload;
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
    setBedCount(state: any, action: PayloadAction<number>) {
      state.bedCount = action.payload;
      return state;
    },
    setBedTypeCount(
      state: any,
      action: PayloadAction<{ id: number; type: BedType; count: number }>,
    ) {
      const { id, type, count } = action.payload;
      const bedRoom = state.bedList[id - 1];
      const prevBeds = bedRoom.beds;
      const index = prevBeds.findIndex((bed: any) => bed.type === type);

      if (index === -1) {
        state.bedList[id - 1].beds = [...prevBeds, { type, count }];
        return state;
      }

      if (count === 0) {
        state.bedList[id - 1].beds.splice(index, 1);
      } else {
        state.bedList[id - 1].beds[index].count = count;
      }
      return state;
    },
    setPublicBedTypeCount(
      state: any,
      action: PayloadAction<{ type: BedType; count: number }>,
    ) {
      const { type, count } = action.payload;
      const index = state.publicBedList.findIndex(
        (bed: any) => bed.type === type,
      );

      if (index === -1) {
        state.publicBedList = [...state.publicBedList, { type, count }];
        return state;
      }

      if (count === 0) {
        state.publicBedList.splice(index, 1);
      } else {
        state.publicBedList[index].count = count;
      }
      return state;
    },
    setBathroomCount(state: any, action: PayloadAction<number>) {
      state.bathroomCount = action.payload;
      return state;
    },
    setBathroomType(state: any, action: PayloadAction<BathRoomType>) {
      state.bathroomType = action.payload;
      return state;
    },
    setCountry(state: any, action: PayloadAction<string>) {
      state.country = action.payload;
    },
    setCity(state: any, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setDistrict(state: any, action: PayloadAction<string>) {
      state.district = action.payload;
    },
    setStreetAddress(state: any, action: PayloadAction<string>) {
      state.streetAddress = action.payload;
    },
    setDetailAddress(state: any, action: PayloadAction<string>) {
      state.detailAddress = action.payload;
    },
    setPostcode(state: any, action: PayloadAction<string>) {
      state.postcode = action.payload;
    },
    setLatitude(state: any, action: PayloadAction<number>) {
      state.latitude = action.payload;
    },
    setLongitude(state: any, action: PayloadAction<number>) {
      state.longitude = action.payload;
    },
    setAmentities(state: any, action: PayloadAction<string[]>) {
      state.amentities = action.payload;
    },
    setConveniences(state: any, action: PayloadAction<string[]>) {
      state.conveniences = action.payload;
    },
    setPhotos(state: any, action: PayloadAction<string[]>) {
      state.photos = action.payload;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;
