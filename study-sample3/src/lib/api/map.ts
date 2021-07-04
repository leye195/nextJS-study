import axios from "axios";

type locationInfoAPIType = {
  latitude: number;
  longitude: number;
};

type GetlocationInfoAPIResponse = {
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  postcode: string;
};

export const getLocationInfoAPI = ({
  latitude,
  longitude,
}: locationInfoAPIType) =>
  axios.get<GetlocationInfoAPIResponse>(
    `/api/maps/location?latitude=${latitude}&longitude=${longitude}`,
  );
