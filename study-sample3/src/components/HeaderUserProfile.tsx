import React, { useState } from "react";
import { useDispatch } from "react-redux";
import OutsideClickHandler from "react-outside-click-handler";
import Link from "next/link";
import { useSelector } from "store";
import { userActions } from "store/user";
import { logoutAPI } from "lib/api/auth";
import HamburgerIcon from "../../public/static/svg/header/hamburger.svg";

const HeaderUserProfile = () => {
  const [isUserMenuOpened, setIsUserMenuOpened] = useState(false);
  const userProfileImage = useSelector((state) => state.user.profileImage);

  const dispatch = useDispatch();

  const handleUserMenuOpen = (isOpen: boolean) => () => {
    setIsUserMenuOpened(isOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutAPI();
      dispatch(userActions.initUser());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <OutsideClickHandler onOutsideClick={handleUserMenuOpen(false)}>
      <button
        className="header-user-profile"
        type="button"
        onClick={handleUserMenuOpen(!isUserMenuOpened)}
      >
        <HamburgerIcon />
        <img
          className="header-user-profile-image"
          src={userProfileImage}
          alt=""
        />
      </button>
      {isUserMenuOpened && (
        <ul className="header-usermenu">
          <li>숙소 관리</li>
          <li>
            <Link href="/room/register/building">
              <a role="presentation" onClick={handleUserMenuOpen(false)}>
                숙소 등록하기
              </a>
            </Link>
          </li>
          <div className="header-menu-divider" />
          <li role="presentation" onClick={handleLogout}>
            로그아웃
          </li>
        </ul>
      )}
    </OutsideClickHandler>
  );
};

export default HeaderUserProfile;
