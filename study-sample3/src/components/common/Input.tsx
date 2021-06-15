import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const Container = styled.div<{ iconExist: boolean }>`
  input {
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({ iconExist }) => (iconExist ? "0 44px 0 11px" : "0 11px")};
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    font-size: 1rem;
    outline: none;

    &::placeholder {
      color: ${palette.gray_76};
    }

    &:focus {
      border-color: ${palette.daryCyan};
    }
  }

  .input-icon-wrapper {
    display: flex;
    align-items: center;
    height: 46px;
    position: absolute;
    right: 1rem;
    top: 0;
  }
`;
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
}

const Input: React.FC<Props> = ({ icon, ...props }) => {
  return (
    <Container iconExist={!!icon}>
      <input {...props} />
      <div className="input-icon-wrapper">{icon}</div>
    </Container>
  );
};

export default Input;
