import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "store";
import { registerRoomActions } from "store/registerRoom";
import Counter from "components/common/Counter";
import Selector from "components/common/Selector";
import RegisterRoomFooter from "components/register/RegisterRoomFooter";
import RegisterRoomPublicBedTypes from "components/register/RegisterRoomPublicBedTypes";
import RegisterRoomBedTypes from "components/register/RegisterRoomBedTypes";
import { bedroomCountList } from "lib/staticData";
import { getNumber } from "lib/utils";
import Colors from "styles/color";

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

  .register-room-counter-wrapper,
  .register-room-bed-counter-wrapper {
    width: 320px;
    margin-top: 1.5rem;
    margin-bottom: 2rem;
  }

  .register-room-bedroom-counter-wrapper {
    width: 20rem;
    margin-bottom: 2rem;
  }

  .register-room-bed-type-info {
    margin-top: 0.5rem;
    margin-bottom: 20px;
    word-break: keep-all;
  }

  .register-room-bed-type-list-wrapper {
    width: 100%;
  }
`;

const RegisterRoomBedrooms = () => {
  const dispatch = useDispatch();

  const { maximumGuestCount } = useSelector((state) => state.registerRoom);
  const { bedroomCount } = useSelector((state) => state.registerRoom);
  const { bedCount } = useSelector((state) => state.registerRoom);
  const { bedList } = useSelector((state) => state.registerRoom);

  const onChange = (value: number) => () => {
    dispatch(registerRoomActions.setMaximumGuestCount(value));
  };

  const onChangBedroomCount = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      registerRoomActions.setBedroomCount(getNumber(e.target.value) || 0),
    );
  };

  const onChangeBedCount = (value: number) => () => {
    dispatch(registerRoomActions.setBedCount(value));
  };

  return (
    <Container>
      <h2>????????? ????????? ?????? ????????? ????????? ??? ??????????</h2>
      <h3>2??????</h3>
      <div className="register-room-step-info">
        ?????? ???????????? ???????????? ????????? ??? ????????? ????????? ????????? ???????????? ?????????
        ???????????????.
      </div>
      <div className="register-room-counter-wrapper">
        <Counter
          label="?????? ?????? ??????"
          increaseNum={1}
          value={maximumGuestCount}
          minValue={1}
          maxValue={15}
          onChange={onChange}
        />
      </div>
      <div className="register-room-bedroom-counter-wrapper">
        <Selector
          label="???????????? ????????? ??? ?????? ????????? ??? ?????????????"
          type="register"
          value={`?????? ${bedroomCount}???`}
          options={bedroomCountList}
          onChange={onChangBedroomCount}
          isValid={!!bedroomCount}
        />
      </div>
      <div className="register-room-bed-counter-wrapper">
        <Counter
          label="??????"
          increaseNum={1}
          value={bedCount}
          minValue={0}
          maxValue={15}
          onChange={onChangeBedCount}
        />
      </div>
      <h4>?????? ??????</h4>
      <p className="register-room-bed-type-info">
        ??? ????????? ?????? ?????? ????????? ???????????? ????????? ????????? ????????? ???????????? ?????????
        ???????????? ??? ????????? ??? ????????????.
      </p>
      <div className="register-room-bed-type-list-wrapper">
        {bedList.map((bedRoom) => (
          <RegisterRoomBedTypes key={bedRoom.id} bedRoom={bedRoom} />
        ))}
        <RegisterRoomPublicBedTypes />
      </div>
      <RegisterRoomFooter
        prevHref="/room/register/building"
        nextHref="/room/register/bathroom"
        isValid={!!bedroomCount}
      />
    </Container>
  );
};

export default RegisterRoomBedrooms;
