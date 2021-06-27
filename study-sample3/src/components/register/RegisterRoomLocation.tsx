import Button from "components/common/Button";
import React from "react";
import styled from "styled-components";
import Colors from "styles/color";
import NavigationIcon from "../../../public/static/svg/register/navigation.svg";

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
`;

const RegisterRoomLocation = () => {
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
        >
          현재 위치 사용
        </Button>
      </div>
    </Container>
  );
};

export default RegisterRoomLocation;
