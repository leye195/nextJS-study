import React from "react";
import { useSelector } from "store";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import WarningIcon from "../../../public/static/svg/common/warning.svg";

interface SelectorContainerProps {
  isValid: boolean;
  validateMode: boolean;
  type: "normal" | "register";
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  disabledOptions?: string[];
  value?: string;
  label?: string;
  errorMessage?: string;
  useValidation?: boolean;
  isValid?: boolean;
  type: "normal" | "register";
}

const normalSelectorStyle = css`
  width: 100%;
  height: 46px;

  select {
    padding: 0 11px;
    width: 100%;
    height: 100%;
    font-size: 1rem;
    background-color: white;
    background-position: right 11px center;
    background-image: url("/static/svg/common/selector/selector_down_arrow.svg");
    background-repeat: no-repeat;
    border: 1px solid ${palette.gray_eb};
    border-radius: 4px;
    outline: none;
    appearance: none;
    -webkit-appearance: none;

    &:focus {
      border-color: ${palette.daryCyan};
    }
  }
`;

const RegisterSelectorStyle = css`
  width: 100%;

  label {
    position: relative;
  }

  span {
    display: block;
    margin-bottom: 0.5rem;
    color: ${palette.gray_76};
    font-size: 1rem;
    font-weight: 600;
  }

  select {
    padding: 0 0.8rem 0 0.8rem;
    width: 100%;
    height: 56px;
    background-color: white;
    background-position: right 14px center;
    background-image: url("/static/svg/common/selector/selector_down_arrow.svg");
    background-repeat: no-repeat;
    border: 1px solid ${palette.gray_b0};
    border-radius: 0.5rem;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
  }
  .selector-warning {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;

    & svg {
      margin-right: 4px;
    }
    p {
      font-size: 12px;
      color: ${palette.davidson_orange};
    }
  }
`;

const Container = styled.div<SelectorContainerProps>`
  ${({ type }) => type === "normal" && normalSelectorStyle};
  ${({ type }) => type === "register" && RegisterSelectorStyle}

  ${({ isValid, validateMode }) =>
    validateMode &&
    css`
      select {
        border-color: ${isValid ? palette.daryCyan : palette.tawny} !important;
        background-color: ${isValid ? "white" : palette.snow};
      }
    `}
`;

const Selector: React.FC<Props> = ({
  disabledOptions = [],
  options = [],
  type = "normal",
  useValidation = true,
  isValid,
  label,
  errorMessage,
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container
      isValid={!!isValid}
      type={type}
      validateMode={validateMode && useValidation}
    >
      <label>
        {label && <span>{label}</span>}
        <select {...props}>
          {disabledOptions.map((option) => (
            <option key={option} disabled value={option}>
              {option}
            </option>
          ))}
          {options?.map((option) => (
            <option key={`${option}`} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
      {useValidation && validateMode && !isValid && (
        <div className="selector-warning">
          <WarningIcon />
          <p>{errorMessage}</p>
        </div>
      )}
    </Container>
  );
};

export default React.memo(Selector);
