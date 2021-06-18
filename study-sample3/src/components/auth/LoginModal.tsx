import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Input from "components/common/Input";
import Button from "components/common/Button";
import { authActions } from "store/auth";
import { userActions } from "store/user";
import useValidateMode from "hooks/useValidateMode";
import { loginAPI } from "lib/api/auth";
import palette from "styles/palette";
import CloseXIcon from "../../../public/static/svg/auth/modal_close_x_icon.svg";
import MailIcon from "../../../public/static/svg/auth/mail.svg";
import OpenedEyeIcon from "../../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../../public/static/svg/auth/closed_eye.svg";

const Container = styled.form`
  width: 565px;
  min-height: 350px;
  padding: 2rem;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    display: block;
    margin: 0 0 40px auto;
    cursor: pointer;
  }

  .login-input-wrapper {
    position: relative;
    margin-bottom: 1rem;
  }

  .login-password-input-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .login-modal-submit-button-wrapper {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .login-modal-set-signup {
    margin-left: 0.5rem;
    color: ${palette.daryCyan};
    cursor: pointer;
  }
`;

interface Props {
  closeModal: () => void;
}

const LoginModal: React.FC<Props> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHided, setIsPasswordHided] = useState(true);

  const { setValidateMode } = useValidateMode();

  const dispatch = useDispatch();

  const togglePasswordHiding = () => {
    setIsPasswordHided(!isPasswordHided);
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidateMode(true);

    if (!email || !password) {
      return;
    }

    try {
      const { data } = await loginAPI({ email, password });

      dispatch(userActions.setLoggedUser(data));
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  const handleClickSignUp = () => {
    dispatch(authActions.setAuthMode("signup"));
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  return (
    <Container onSubmit={onSubmitLogin}>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <div className="login-input-wrapper">
        <Input
          placeholder="이메일 주소"
          type="email"
          name="email"
          value={email}
          isValid={!!email}
          icon={<MailIcon />}
          onChange={onChangeEmail}
          errorMessage="이메일이 필요합니다."
        />
      </div>
      <div className="login-input-wrapper login-password-input-wrapper">
        <Input
          placeholder="비밀번호 설정하기"
          type={isPasswordHided ? "password" : "text"}
          name="password"
          value={password}
          isValid={!!password}
          icon={
            isPasswordHided ? (
              <ClosedEyeIcon onClick={togglePasswordHiding} />
            ) : (
              <OpenedEyeIcon onClick={togglePasswordHiding} />
            )
          }
          onChange={onChangePassword}
          errorMessage="비밀번호를 입력하세요."
        />
      </div>
      <div className="login-modal-submit-button-wrapper">
        <Button type="submit">로그인</Button>
      </div>
      <p>
        에어비엔비 계정이 없으세요?
        <span
          className="login-modal-set-signup"
          onClick={handleClickSignUp}
          role="presentation"
        >
          회원가입
        </span>
      </p>
    </Container>
  );
};

export default LoginModal;
