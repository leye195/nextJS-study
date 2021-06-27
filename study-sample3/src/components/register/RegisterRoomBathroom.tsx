import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "store";
import { registerRoomActions } from "store/registerRoom";
import Counter from "components/common/Counter";
import RadioGroup from "components/common/RadioGroup";
import RegisterRoomFooter from "components/register/RegisterRoomFooter";
import Colors from "styles/color";
import { bathroomRadioList } from "lib/staticData";
import { BathRoomType } from "types/room";

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

  .register-room-counter-wrapper {
    width: 320px;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const RegisterRoomBathroom = () => {
  const bathroomCount = useSelector(
    (state) => state.registerRoom.bathroomCount,
  );

  const bathroomType = useSelector((state) => state.registerRoom.bathroomType);

  const dispatch = useDispatch();

  const handleBathCountChange = (value: number) => () => {
    dispatch(registerRoomActions.setBathroomCount(value));
  };

  const handleBathTyepChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      registerRoomActions.setBathroomType(e.target.value as BathRoomType),
    );
  };

  return (
    <Container>
      <h2>욕실 수</h2>
      <h3>3단계</h3>
      <p className="register-room-step-info">
        샤워실 또는 욕조가 없는 경우 0.5개로 간주합니다.
      </p>

      <div className="register-room-counter-wrapper">
        <Counter
          label="욕조"
          onChange={handleBathCountChange}
          increaseNum={0.5}
          minValue={0}
          value={bathroomCount}
        />
      </div>
      <RadioGroup
        label="게스트가 단독으로 사용하는 욕실인가요?"
        isValid={!!bathroomType}
        options={bathroomRadioList}
        value={bathroomType}
        onChange={handleBathTyepChange}
        errorMessage="옵션을 선택하세요"
      />
      <RegisterRoomFooter
        prevHref="/room/register/bedrooms"
        nextHref="/room/register/location"
        isValid={bathroomCount > 0 && !!bathroomType}
      />
    </Container>
  );
};

export default RegisterRoomBathroom;
