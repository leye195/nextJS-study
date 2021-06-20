import React, { ChangeEvent, useMemo } from "react";
import styled from "styled-components";
import Selector from "components/common/Selector";
import RadioGroup from "components/common/RadioGroup";
import RegisterRoomFooter from "components/register/RegisterRoomFooter";
import palette from "styles/palette";
import {
  largeBuildingTypeList,
  buildingTypeList,
  convertLargeBuilding,
  roomTypeRadioList,
  isSetUpForGuestOptions,
} from "lib/staticData";
import { useDispatch } from "react-redux";
import { registerRoomActions } from "store/registerRoom";
import { useSelector } from "store";

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
    color: ${palette.gray_76};
  }

  .register-room-building-selector-wrapper {
    width: 20rem;
    margin-bottom: 2rem;
  }

  .register-room-room-type {
    max-width: 485px;
    margin-bottom: 50px;
  }

  .register-room-is-setup-for-guest {
    margin-bottom: 50px;
  }
`;

const RegisterRoomBuilding: React.FC = () => {
  const dispatch = useDispatch();

  const { largeBuildingType, buildingType, roomType, isSetUpForGuest } =
    useSelector((state) => state.registerRoom);

  const isValid = useMemo(() => {
    if (
      !largeBuildingType ||
      !buildingType ||
      !roomType ||
      !isSetUpForGuest === null
    ) {
      return false;
    }

    return true;
  }, [largeBuildingType, buildingType, roomType, isSetUpForGuest]);

  const detailBuildingOptions = useMemo(() => {
    if (!largeBuildingType) return [];

    const type = convertLargeBuilding[largeBuildingType.split(" ")[0]];
    const buildingType = buildingTypeList[type] as string[];

    dispatch(registerRoomActions.setBuildingType(buildingType[0]));

    return buildingType;
  }, [largeBuildingType]);

  const onChangeLargeBuildingType = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setLargeBuildingType(e.target.value));
  };

  const onChangeBuildingType = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(registerRoomActions.setBuildingType(e.target.value));
  };

  const onChangeRoomType = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      registerRoomActions.setRoomType(
        e.target.value as "entire" | "private" | "public",
      ),
    );
  };

  const onChangeIsSetUpForGuest = (e: ChangeEvent<HTMLInputElement>) => {
    const isForGuest = e.target.value === "true" && true;
    dispatch(registerRoomActions.setIsSetUpForGuest(isForGuest));
  };

  return (
    <Container>
      <h2>등록하실 숙소 종료는 무엇인가요?</h2>
      <h3>1단계</h3>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={largeBuildingType || undefined}
          defaultValue="하나를 선택해주세요"
          disabledOptions={["하나를 선택해주세요"]}
          isValid={!!largeBuildingType}
          label="우선 범위를 좁혀볼까요?"
          options={largeBuildingTypeList}
          onChange={onChangeLargeBuildingType}
          errorMessage="옵션을 선택하세요"
        />
      </div>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={buildingType || undefined}
          disabled={!largeBuildingType}
          isValid={!!buildingType}
          label="건물 유형을 선택하세요."
          options={detailBuildingOptions}
          onChange={onChangeBuildingType}
          errorMessage="옵션을 선택하세요"
        />
      </div>
      {buildingType && (
        <>
          <div className="register-room-room-type">
            <RadioGroup
              label="게스트가 묵게 될 숙소 유형을 골라주세요."
              options={roomTypeRadioList}
              value={roomType}
              onChange={onChangeRoomType}
              errorMessage="옵션을 선택하세요"
              isValid={!!roomType}
            />
          </div>
          <div className="register-room-is-setup-for-guest">
            <RadioGroup
              label="게스트만 사용하도록 만들어진 숙소인가요?"
              options={isSetUpForGuestOptions}
              value={isSetUpForGuest}
              onChange={onChangeIsSetUpForGuest}
              errorMessage="옵션을 선택하세요"
              isValid={isSetUpForGuest !== null}
            />
          </div>
        </>
      )}
      <RegisterRoomFooter
        isValid={isValid}
        prevHref="/"
        nextHref="/room/register/bedrooms"
      />
    </Container>
  );
};

export default RegisterRoomBuilding;
