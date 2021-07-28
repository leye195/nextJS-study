import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "store";
import { registerRoomActions } from "store/registerRoom";
import CheckboxGroup from "components/common/CheckboxGroup";
import Colors from "styles/color";
import { convenienceList } from "lib/staticData";
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

const RegisterRoomConveniences = () => {
  const dispatch = useDispatch();
  const conveniences = useSelector((state) => state.registerRoom.conveniences);
  const onChangeConveniences = (selected: string[]) => {
    dispatch(registerRoomActions.setConveniences(selected));
  };

  return (
    <Container>
      <h2>게스트가 어떤 공간을 사용할 수 있나요?</h2>
      <h3>6단계</h3>
      <div className="register-room-step-info">
        등록하고자 하는 숙소에서 게스트가 이용 가능한 공용 공간을 선택하세요.
      </div>
      <div className="register-room-conveniences-checkbox-group-wrapper">
        <CheckboxGroup
          value={conveniences}
          onChange={onChangeConveniences}
          options={convenienceList}
        />
      </div>
      <RegisterRoomFooter
        prevHref="/room/register/amentities"
        nextHref="/room/register/photo"
        isValid
      />
    </Container>
  );
};

export default RegisterRoomConveniences;
