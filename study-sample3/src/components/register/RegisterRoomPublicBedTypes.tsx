import React, { useState, useMemo, ChangeEvent } from "react";
import styled from "styled-components";
import Button from "components/common/Button";
import Selector from "components/common/Selector";
import Counter from "components/common/Counter";
import Colors from "styles/color";
import { BedType } from "types/room";
import { bedTypes } from "lib/staticData";
import { useDispatch } from "react-redux";
import { registerRoomActions } from "store/registerRoom";
import { useSelector } from "store";

const Container = styled.li`
  padding: 24px 0;
  width: 100%;
  border-top: 1px solid ${Colors["grayDD" as string]};

  &:last-child {
    border-bottom: 1px sollid ${Colors["grayDD" as string]};
  }

  .register-room-bed-type-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .register-room-bed-type-bedroom {
    display: flex;
    margin-bottom: 0.5rem;
    font-size: 19px;
    color: ${Colors["gray48" as string]};
  }

  .register-room-bed-type-bedroom-counts {
    color: ${Colors["gray76" as string]};
  }

  .register-room-bed-type-counters {
    width: 20rem;
    margin-top: 1.5rem;
  }

  .register-room-bed-type-counter {
    width: 290px;
    margin-bottom: 1.2rem;
  }

  .register-room-bed-type-selector-wrapper {
    margin-top: 1rem;
    width: 20rem;
  }
`;

const RegisterRoomPublicBedTypes: React.FC = () => {
  const [opened, setOpened] = useState(false);

  const publicBedList = useSelector(
    (state) => state.registerRoom.publicBedList,
  );

  const dispatch = useDispatch();
  const initialBedOptions = () => publicBedList.map((bed) => bed.type);
  const [activeBedOptions, setActiveBedOptions] = useState(initialBedOptions);

  const totalBedsCount = useMemo(() => {
    const total = publicBedList.reduce((n, bed) => n + bed.count, 0);
    return total;
  }, [publicBedList]);

  const bedTexts = useMemo(() => {
    const texts = publicBedList.map((bed) => `${bed.type} ${bed.count}개`);
    return texts.join(",");
  }, [publicBedList]);

  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((type) => !activeBedOptions.includes(type));
  }, [activeBedOptions, publicBedList]);

  const toggleOpened = () => {
    setOpened((prev) => !prev);
  };

  const handleSelector = (e: ChangeEvent<HTMLSelectElement>) => {
    setActiveBedOptions([...activeBedOptions, e.target.value as BedType]);
  };

  const handleCounter = (type: BedType) => (value: number) => () => {
    dispatch(registerRoomActions.setPublicBedTypeCount({ type, count: value }));

    if (value === 0) {
      setActiveBedOptions((options: BedType[]) =>
        options.filter((options: BedType) => options !== type),
      );
    }
  };

  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div className="register-room-bed-type-bedroom-texts">
          <p className="register-room-bed-type-bedroom">공용 공간</p>
          <div className="register-room-bed-type-bedroom-counts">
            침대 {totalBedsCount}개 <br />
            {bedTexts}
          </div>
        </div>
        <Button onClick={toggleOpened} styleType="register" color="white">
          {opened && "완료"}
          {!opened &&
            (totalBedsCount === 0 ? "침대 추가하기" : "침대 수정하기")}
        </Button>
      </div>
      {opened && (
        <div className="register-room-bed-type-counters">
          {activeBedOptions.map((type) => (
            <div className="register-room-bed-type-counter" key={type}>
              <Counter
                label={type}
                minValue={0}
                key={type}
                value={
                  publicBedList.find((bed) => bed.type === type)?.count || 0
                }
                increaseNum={1}
                onChange={handleCounter(type)}
              />
            </div>
          ))}
          <div className="register-room-bed-type-selector-wrapper">
            <Selector
              type="register"
              value="다른 침대 추가"
              disabledOptions={["다른 침대 추가"]}
              options={lastBedOptions}
              useValidation={false}
              onChange={handleSelector}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default RegisterRoomPublicBedTypes;
