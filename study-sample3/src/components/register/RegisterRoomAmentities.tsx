import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import CheckboxGroup from "components/common/CheckboxGroup";
import { amentityList } from "lib/staticData";
import Colors from "styles/color";
import { useSelector } from "store";
import { registerRoomActions } from "store/registerRoom";
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
`;

const RegisterRoomAmentities = () => {
  const dispatch = useDispatch();

  const amentities = useSelector((state) => state.registerRoom.amentities);

  const onChangeAmentities = (selected: string[]) => {
    dispatch(registerRoomActions.setAmentities(selected));
  };

  return (
    <Container>
      <h2>어떤 편의시설을 제공하시나요?</h2>
      <h3>5단계</h3>
      <div className="register-room-step-info">
        일반적으로 게스트가 기대하는 편의시설 목록입니다. 숙소를 등록한 후
        언제든 편의시설을 추가할 수 있어요.
      </div>
      <div className="register-room-amentities-checkbox-group-wrapper">
        <CheckboxGroup
          value={amentities}
          options={amentityList}
          onChange={onChangeAmentities}
        />
      </div>
      <RegisterRoomFooter
        prevHref="/room/register/location"
        nextHref="/room/register/conveniences"
        isValid
      />
    </Container>
  );
};

export default RegisterRoomAmentities;
