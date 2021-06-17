import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "store";
import { authActions } from "store/auth";
import AuthModal from "components/auth/AuthModal";
import palette from "styles/palette";
import useModal from "hooks/useModal";
import LogoIcon from "../../public/static/svg/logo/logo.svg";
import LogoTextIcon from "../../public/static/svg/logo/logo_text.svg";
import HamburgerIcon from "../../public/static/svg/header/hamburger.svg";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 0 3.5rem;
  width: 100%;
  height: 80px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0 1px 12px;
  z-index: 10;

  .header-logo-wrapper {
    display: flex;
    align-items: center;

    .header-logo {
      margin-right: 0.4rem;
    }
  }

  .header-auth-buttons {
    .header-signup-button {
      height: 42px;
      margin-right: 0.5rem;
      padding: 0 1rem;
      border: 0;
      border-radius: 0.8rem;
      background-color: white;
      cursor: pointer;
      outline: none;

      &:hover {
        background-color: ${palette.gray_f7};
      }
    }

    .header-login-button {
      height: 42px;
      padding: 0 1rem;
      border: 0;
      border-radius: 0.8rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      background-color: white;
      cursor: pointer;
      outline: none;

      &:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .header-user-profile {
    display: flex;
    align-items: center;
    padding: 0 0.45rem 0 1rem;
    height: 42px;
    border: 0;
    border-radius: 21px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18);
    background-color: white;
    outline: none;
    cursor: pointer;

    &:hover {
      box-shadow: 0 2px 0.5rem rgba(0, 0, 0, 0.12);
    }

    .header-user-profile-image {
      margin-left: 0.5rem;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
`;

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const { ModalPortal, openModal, closeModal } = useModal();

  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  const changeAuthModal = (mode: "signup" | "login") => () => {
    dispatch(authActions.setAuthMode(mode));
    openModal();
  };

  return (
    <Container>
      <Link href="/">
        <a className="header-logo-wrapper">
          <LogoIcon className="header-logo" />
          <LogoTextIcon />
        </a>
      </Link>
      {!user.isLoggedIn && (
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
      )}
      {user.isLoggedIn && (
        <button className="header-user-profile" type="button">
          <HamburgerIcon />
          <img
            className="header-user-profile-image"
            src={user.profileImage}
            alt=""
          />
        </button>
      )}

      <ModalPortal>
        <AuthModal closeModal={closeModal} />
      </ModalPortal>
    </Container>
  );
};

export default Header;
