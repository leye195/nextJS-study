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

interface Props {
  bedRoom: {
    id: number;
    beds: { type: BedType; count: number }[];
  };
}

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
    justift-content: center;
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

const RegisterRoomBedTypes: React.FC<Props> = ({ bedRoom }) => {
  const [opened, setOpened] = useState(false);
  const [activeBedOptions, setActiveBedOptions] = useState<BedType[]>([]);

  const dispatch = useDispatch();

  const totalBedsCount = useMemo(() => {
    const total = bedRoom.beds.reduce((n, bed) => n + bed.count, 0);
    return total;
  }, [bedRoom]);

  const lastBedOptions = useMemo(() => {
    return bedTypes.filter((type) => !activeBedOptions.includes(type));
  }, [activeBedOptions, bedRoom]);

  const toggleOpened = () => {
    setOpened((prev) => !prev);
  };

  const handleSelector = (e: ChangeEvent<HTMLSelectElement>) => {
    setActiveBedOptions([...activeBedOptions, e.target.value as BedType]);
  };

  const handleCounter = (value: number) => () => {
    dispatch(registerRoomActions.setBed);
  };

  return (
    <Container>
      <div className="register-room-bed-type-top">
        <div className="register-room-bed-type-bedroom-texts">
          <p className="register-room-bed-type-bedroom">{bedRoom.id}번 침실</p>
          <div className="register-room-bed-type-bedroom-counts">침대 0개</div>
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
                  bedRoom.beds.find((bed) => bed.type === type)?.count || 0
                }
                increaseNum={1}
                onChange={handleCounter}
              />
            </div>
          ))}
          <div className="register-room-bed-type-selector-wrapper">
            <Selector
              type="register"
              defaultValue="다른 침대 추가"
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

export default RegisterRoomBedTypes;
