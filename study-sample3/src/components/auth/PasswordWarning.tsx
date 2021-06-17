import React from "react";
import styled from "styled-components";
import palette from "styles/palette";
import RedXIcon from "../../../public/static/svg/auth/red_x_icon.svg";
import GreenCheckIcon from "../../../public/static/svg/auth/green_check_icon.svg";

const Container = styled.p<{ isValid: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ isValid }) => {
    return isValid ? palette.green : palette.davidson_orange;
  }};

  svg {
    margin-right: 0.5rem;
  }
`;

interface Props {
  isValid: boolean;
  text: string;
}

const PasswordWarning: React.FC<Props> = ({ isValid, text }) => {
  return (
    <Container isValid={isValid}>
      {isValid ? <GreenCheckIcon /> : <RedXIcon />}
      {text}
    </Container>
  );
};

export default PasswordWarning;
