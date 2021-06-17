import React from "react";
import styled from "styled-components";
import SignUpModal from "components/auth/SignUpModal";
import { useSelector } from "store";
import LoginModal from "./LoginModal";

const Container = styled.div`
  z-index: inherit;
`;

interface Props {
  closeModal: () => void;
}

const AuthModal: React.FC<Props> = ({ closeModal }) => {
  const authMode = useSelector((state) => state.auth.authMode);

  return (
    <Container>
      {authMode === "signup" && <SignUpModal closeModal={closeModal} />}
      {authMode === "login" && <LoginModal closeModal={closeModal} />}
    </Container>
  );
};

export default AuthModal;
