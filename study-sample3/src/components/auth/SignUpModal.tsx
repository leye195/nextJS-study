import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import palette from "styles/palette";
import Input from "components/common/Input";
import Selector from "components/common/Selector";
import Button from "components/common/Button";
import { monthList, dayList, yearList } from "lib/staticData";
import { signUpAPI } from "lib/api/auth";
import { useSelector } from "store";
import { authActions } from "store/auth";
import { userActions } from "store/user";
import useValidateMode from "hooks/useValidateMode";
import CloseXIcon from "../../../public/static/svg/auth/modal_close_x_icon.svg";
import MailIcon from "../../../public/static/svg/auth/mail.svg";
import PersonIcon from "../../../public/static/svg/auth/person.svg";
import OpenedEyeIcon from "../../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../../public/static/svg/auth/closed_eye.svg";
import PasswordWarning from "./PasswordWarning";

const Container = styled.form`
  width: 565px;
  min-height: 610px;
  padding: 2rem;
  background-color: white;
  z-index: 11;

  .modal-close-x-icon {
    display: block;
    margin: 0 0 40px auto;
    cursor: pointer;
  }

  .input-wrapper {
    margin-bottom: 1rem;
    position: relative;
  }

  .sign-up-password-wrapper {
    svg {
      cursor: pointer;
    }
  }

  .sign-up-birth-label {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
  }

  .sign-up-modal-birth-info {
    margin-bottom: 1rem;
    line-height: 1.2;
    color: ${palette.gray_48};
  }

  .sign-up-modal-birth-selectors {
    display: flex;
    margin-bottom: 24px;

    & .sign-up-modal-birth-month-selector {
      margin-right: 1rem;
      flex-grow: 1;
    }

    & .sign-up-modal-birth-day-selector {
      margin-right: 1rem;
      width: 25%;
    }

    & .sign-up-modal-birth-year-selector {
      width: 33.3333%;
    }
  }

  .sign-up-modal-submit-button-wrapper {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid ${palette.gray_eb};
  }

  .sign-up-modal-set-login {
    margin-left: 0.5rem;
    color: ${palette.daryCyan};
    cursor: pointer;
  }
`;

const PASSWORD_MIN_LENGTH = 8;

interface Props {
  closeModal: () => void;
}

const SignUpModal: React.FC<Props> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);

  const authMode = useSelector((state) => state.auth.authMode);

  const isPassowordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !lastName ||
      password.includes(lastName) ||
      password.includes(email.split("@")[0]),
    [password, lastName, email],
  );
  const isPasswordOverMinLength = useMemo(
    () => !!password && password.length >= PASSWORD_MIN_LENGTH,
    [password],
  );
  const isPasswordHasNumberOrSymbol = useMemo(
    () => /[0-9]/g.test(password) || /[{}[\]/?.,;:|)*~`!^-_+<>@#$%&\\=('"]/g,
    [password],
  );

  const { setValidateMode } = useValidateMode();

  const dispatch = useDispatch();

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const onFocusPassword = () => {
    setPasswordFocused(true);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeBirthMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(e.target.value);
  };

  const onChangeBirthYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(e.target.value);
  };

  const onChangeBirthDay = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(e.target.value);
  };

  const onSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValidateMode(true);

    if (!email || !lastName || !firstName || !password) {
      return;
    }

    if (
      !isPasswordOverMinLength ||
      isPassowordHasNameOrEmail ||
      !isPasswordHasNumberOrSymbol
    ) {
      return;
    }

    try {
      const signUpBody = {
        email,
        firstName,
        lastName,
        password,
        birthday: new Date(
          `${birthYear}-${birthMonth!.replace("월", "")}-${birthDay}`,
        ).toISOString(),
      };
      const { data } = await signUpAPI(signUpBody);

      dispatch(userActions.setLoggedUser(data));

      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickLogin = () => {
    dispatch(authActions.setAuthMode("login"));
  };

  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  return (
    <Container onSubmit={onSubmitSignUp}>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <div className="input-wrapper">
        <Input
          type="email"
          name="email"
          placeholder="이메일 주소"
          icon={<MailIcon />}
          value={email}
          onChange={onChangeEmail}
          useValidation
          isValid={!!email}
          errorMessage="이메일이 필요합니다"
        />
      </div>
      <div className="input-wrapper">
        <Input
          type="text"
          name="lastName"
          placeholder="이름"
          icon={<PersonIcon />}
          value={lastName}
          onChange={onChangeLastName}
          useValidation
          isValid={!!lastName}
          errorMessage="이름을 입력하세요"
        />
      </div>
      <div className="input-wrapper">
        <Input
          type="text"
          name="firstName"
          placeholder="성"
          icon={<PersonIcon />}
          value={firstName}
          onChange={onChangeFirstName}
          useValidation
          isValid={!!firstName}
          errorMessage="성을 입력하세요"
        />
      </div>
      <div className="input-wrapper sign-up-password-wrapper">
        <Input
          type={hidePassword ? "password" : "text"}
          name="password"
          placeholder="비밀번호 설정하기"
          icon={
            hidePassword ? (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
          onFocus={onFocusPassword}
          useValidation
          isValid={
            isPassowordHasNameOrEmail &&
            isPasswordHasNumberOrSymbol &&
            isPasswordOverMinLength
          }
          errorMessage="비밀번호를 입력하세요"
        />
      </div>
      {passwordFocused && (
        <>
          <PasswordWarning
            isValid={!isPassowordHasNameOrEmail}
            text="비밀번호에 본인 이름이나 메일 주소를 포함 할 수 없습니다."
          />
          <PasswordWarning
            isValid={!!isPasswordHasNumberOrSymbol}
            text="숫자나 기호를 포함하세요."
          />
          <PasswordWarning isValid={isPasswordOverMinLength} text="최소 8자" />
        </>
      )}

      <p className="sign-up-birth-label">생일</p>
      <p className="sign-up-modal-birth-info">
        만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른
        에어비앤비 이용자에게 공개되지 않습니다.
      </p>
      <div className="sign-up-modal-birth-selectors">
        <div className="sign-up-modal-birth-month-selector">
          <Selector
            options={monthList}
            disabledOptions={["월"]}
            defaultValue="월"
            value={birthMonth}
            onChange={onChangeBirthMonth}
            isValid={!!birthMonth}
          />
        </div>
        <div className="sign-up-modal-birth-day-selector">
          <Selector
            options={dayList}
            disabledOptions={["일"]}
            defaultValue="일"
            value={birthDay}
            onChange={onChangeBirthDay}
            isValid={!!birthDay}
          />
        </div>
        <div className="sign-up-modal-birth-year-selector">
          <Selector
            options={yearList}
            disabledOptions={["년"]}
            defaultValue="년"
            value={birthYear}
            onChange={onChangeBirthYear}
            isValid={!!birthYear}
          />
        </div>
      </div>
      <div className="sign-up-modal-submit-button-wrapper">
        <Button type="submit">가입하기</Button>
      </div>
      <p>
        이미 에어비앤비 계정이 있으신가요?
        <span
          className="sign-up-modal-set-login"
          role="presentation"
          onClick={handleClickLogin}
        >
          로그인
        </span>
      </p>
    </Container>
  );
};

export default SignUpModal;
