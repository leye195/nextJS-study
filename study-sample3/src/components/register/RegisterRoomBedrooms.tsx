import Button from "components/common/Button";
import Counter from "components/common/Counter";
import Selector from "components/common/Selector";
import { bedroomCountList } from "lib/staticData";
import { getNumber } from "lib/utils";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { registerRoomActions } from "store/registerRoom";
import styled from "styled-components";
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

  .register-room-bedroom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
    width: 100%;
    border-top: 1px solid ${Colors["grayDD" as string]};

    &:last-child {
      border-bottom: 1px sollid ${Colors["grayDD" as string]};
    }
  }

  .register-room-bed-type-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .register-room-bed-type-bedroom-texts {
    margin-bottom: 28px;
  }

  .register-room-bed-type-bedroom {
    display: flex;
    justift-content: center;
    margin-bottom: 0.5rem;
    font-size: 19px;
    color: ${Colors["gray48" as string]};
  }

  .register-room-bed-type-bedroom-counts {
    color: ${Colors["gray76" as string]};
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
      <h2>숙소에 얼마나 많은 인원이 숙박할 수 있나요?</h2>
      <h3>2단계</h3>
      <div className="register-room-step-info">
        모든 게스트가 편안하게 숙박할 수 있도록 침대가 충분히 구비되어 있는지
        확인하세요.
      </div>
      <div className="register-room-counter-wrapper">
        <Counter
          label="최대 숙박 인원"
          increaseNum={1}
          value={maximumGuestCount}
          minValue={1}
          maxValue={15}
          onChange={onChange}
        />
      </div>
      <div className="register-room-bedroom-counter-wrapper">
        <Selector
          label="게스트가 사용할 수 있는 침실은 몇 개인가요?"
          type="register"
          value={`침실 ${bedroomCount}개`}
          options={bedroomCountList}
          onChange={onChangBedroomCount}
        />
      </div>
      <div className="register-room-bed-counter-wrapper">
        <Counter
          label="침대"
          increaseNum={1}
          value={bedCount}
          minValue={0}
          maxValue={15}
          onChange={onChangeBedCount}
        />
      </div>
      <h4>침대 유형</h4>
      <p className="register-room-bed-type-info">
        각 침실에 놓인 침대 유형을 명시하면 숙소에 침대가 어떻게 구비되어 있는지
        게스트가 잘 파악할 수 있습니다.
      </p>
      <div className="register-room-bed-type-list-wrapper">
        {bedList.map((bedRoom) => (
          <div className="register-room-bedroom">
            <div className="register-room-bed-type-top">
              <div className="register-room-bed-type-bedroom-texts">
                <p className="register-room-bed-type-bedroom">
                  {bedRoom.id}번 침실
                </p>
                <div className="register-room-bed-type-bedroom-counts">
                  침대 0개
                </div>
              </div>
            </div>
            <Button styleType="register" color="white">
              침대 추가하기
            </Button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default RegisterRoomBedrooms;
