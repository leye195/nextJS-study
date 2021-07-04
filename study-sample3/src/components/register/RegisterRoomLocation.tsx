import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "store";
import { registerRoomActions } from "store/registerRoom";
import Button from "components/common/Button";
import Input from "components/common/Input";
import Selector from "components/common/Selector";
import { getLocationInfoAPI } from "lib/api/map";
import { countryList } from "lib/staticData";
import Colors from "styles/color";
import NavigationIcon from "../../../public/static/svg/register/navigation.svg";
import RegisterRoomFooter from "./RegisterRoomFooter";

const Container = styled.div`
  padding: 3.8rem 1.8rem 6.2rem;

  h2 {
    margin-bottom: 3.5rem;
    font-size: 19px;
    font-weight: 800;
  }

  h3 {
    margin-bottom: 0.5rem;
    font-size: 14px;
    font-weight: bold;
    color: ${Colors["gray76" as string]};
  }

  h4 {
    font-weight: bold;
  }

  .register-room-step-info {
    margin-bottom: 1.5rem;
    max-width: 400px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    word-break: keep-all;
  }

  .register-room-location-button-wrapper {
    width: 10.5rem;
    margin-bottom: 1.5rem;
  }

  .register-room-location-selector-wrapper {
    width: 23rem;
    margin-bottom: 1.5em;
  }

  .register-room-location-city-district,
  .register-room-location-lng-lat {
    display: flex;
    justify-content: space-between;
    width: 25rem;
    margin-bottom: 1.5rem;
  }

  .register-room-location-street-address,
  .register-room-location-detail-address,
  .register-room-location-post-code {
    width: 25rem;
    margin-bottom: 1.5rem;
  }
`;

const RegisterRoomLocation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const country = useSelector((state) => state.registerRoom.country);
  const city = useSelector((state) => state.registerRoom.city);
  const district = useSelector((state) => state.registerRoom.district);
  const streetAddress = useSelector(
    (state) => state.registerRoom.streetAddress,
  );
  const detailAddress = useSelector(
    (state) => state.registerRoom.detailAddress,
  );
  const postCode = useSelector((state) => state.registerRoom.postcode);
  const latitude = useSelector((state) => state.registerRoom.latitude);
  const longitude = useSelector((state) => state.registerRoom.longitude);

  const dispatch = useDispatch();

  const onSuccessGetLocation = async ({ coords }: { coords: any }) => {
    const { latitude, longitude } = coords;

    try {
      const { data: currentLocation } = await getLocationInfoAPI({
        latitude,
        longitude,
      });

      dispatch(registerRoomActions.setCountry(currentLocation.country));
      dispatch(registerRoomActions.setCity(currentLocation.city));
      dispatch(registerRoomActions.setDistrict(currentLocation.district));
      dispatch(
        registerRoomActions.setStreetAddress(currentLocation.streetAddress),
      );
      dispatch(registerRoomActions.setPostcode(currentLocation.postcode));
      dispatch(registerRoomActions.setLatitude(currentLocation.latitude));
      dispatch(registerRoomActions.setLongitude(currentLocation.longitude));
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  const onClickGetCurrentLocation = () => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
      console.log(e);
    });
  };

  const onChangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setCountry(e.target.value));
  };

  const onChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setCity(e.target.value));
  };

  const onChangeDistrict = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setDistrict(e.target.value));
  };

  const onChangeStreetAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setStreetAddress(e.target.value));
  };

  const onChangeDetailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setDetailAddress(e.target.value));
  };

  const onChangePostCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setPostcode(e.target.value));
  };

  return (
    <Container>
      <h2>숙소의 위치를 알려주세요</h2>
      <h3>4단계</h3>
      <p className="register-room-step-info">
        정확한 숙소 주소는 게스타가 예약을 완료한 후에만 공개됩니다.
      </p>
      <div className="register-room-location-button-wrapper">
        <Button
          type="button"
          color="darkCyan"
          colorReverse
          styleType="normal"
          icon={<NavigationIcon />}
          onClick={onClickGetCurrentLocation}
        >
          {isLoading ? "불러오는 중..." : "현재 위치 사용"}
        </Button>
      </div>
      <div className="register-room-location-selector-wrapper">
        <Selector
          type="register"
          options={countryList}
          useValidation={false}
          label="국가/지역"
          defaultValue="국가/지역 선택"
          value={country}
          disabledOptions={["국가/지역 선택"]}
          onChange={onChangeCountry}
        />
      </div>
      <div className="register-room-location-city-district">
        <Input label="시/도" value={city} onChange={onChangeCity} />
        <Input label="시/군/도" value={district} onChange={onChangeDistrict} />
      </div>
      <div className="register-room-location-street-address">
        <Input
          label="도로명주소"
          value={streetAddress}
          onChange={onChangeStreetAddress}
        />
      </div>
      <div className="register-room-location-detail-address">
        <Input
          label="동호수(선택 사항)"
          value={detailAddress}
          onChange={onChangeDetailAddress}
        />
      </div>
      <div className="register-room-location-post-code">
        <Input label="우편번호" value={postCode} onChange={onChangePostCode} />
      </div>
      <div className="register-room-location-lng-lat">
        <Input label="위도" value={latitude} onChange={() => {}} />
        <Input label="경도" value={longitude} onChange={() => {}} />
      </div>
      <RegisterRoomFooter
        prevHref="/room/register/bathroom"
        nextHref="/room/register/geometry"
      />
    </Container>
  );
};

export default RegisterRoomLocation;
