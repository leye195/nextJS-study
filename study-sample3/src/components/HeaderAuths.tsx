import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "store/auth";
import useModal from "hooks/useModal";
import AuthModal from "components/auth/AuthModal";

const HeaderAuths: React.FC = () => {
  const { ModalPortal, openModal, closeModal } = useModal();

  const dispatch = useDispatch();

  const changeAuthModal = (mode: "signup" | "login") => () => {
    dispatch(authActions.setAuthMode(mode));
    openModal();
  };

  return (
    <>
      <div className="header-auth-buttons">
        <button
          className="header-signup-button"
          type="button"
          onClick={changeAuthModal("signup")}
        >
          회원가입
        </button>
        <button
          className="header-login-button"
          type="button"
          onClick={changeAuthModal("login")}
        >
          로그인
        </button>
      </div>
      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </>
  );
};

export default HeaderAuths;
