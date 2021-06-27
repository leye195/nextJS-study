import React, { useEffect, MouseEvent } from "react";
import Link from "next/link";
import styled from "styled-components";
import useValidateMode from "hooks/useValidateMode";
import Button from "components/common/Button";
import palette from "styles/palette";
import BackArrowIcon from "../../../public/static/svg/register/register_room_footer_back_arrow.svg";

interface Props {
  prevHref?: string;
  nextHref?: string;
  isValid?: boolean;
}

const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 30px 20px;
  width: 100%;
  height: 82px;
  background-color: white;
  border-top: 1px solid ${palette.gray_dd};
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;

  .register-room-footer-back {
    display: flex;
    align-items: center;
    color: ${palette.daryCyan};
    cursor: pointer;

    & svg {
      margin-right: 0.5rem;
    }
  }

  .register-room-footer-next {
    width: 4rem;
  }
`;

const RegisterRoomFooter: React.FC<Props> = ({
  prevHref,
  nextHref,
  isValid,
}) => {
  const { setValidateMode } = useValidateMode();

  const onClickNext = (e: MouseEvent<HTMLButtonElement>) => {
    if (!isValid) {
      e.preventDefault();
      setValidateMode(true);
    }
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  return (
    <Container>
      <Link href={prevHref || ""}>
        <a className="register-room-footer-back">
          <BackArrowIcon />
          뒤로
        </a>
      </Link>
      <Link href={nextHref || ""}>
        <a className="register-room-footer-next">
          <Button
            styleType="normal"
            type="button"
            color="darkCyan"
            onClick={onClickNext}
          >
            계속
          </Button>
        </a>
      </Link>
    </Container>
  );
};

export default RegisterRoomFooter;
