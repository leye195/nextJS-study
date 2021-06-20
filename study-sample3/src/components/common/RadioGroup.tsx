import React from "react";
import { useSelector } from "store";
import styled, { css } from "styled-components";
import palette from "styles/palette";
import WarningIcon from "../../../public/static/svg/common/warning.svg";

interface RadioProps {
  isValid: boolean;
  validateMode: boolean;
}

interface Props {
  isValid?: boolean;
  label?: string;
  value?: any;
  errorMessage?: string;
  options?: Array<{
    label: string;
    description?: string;
    value: any;
  }>;
  onChange?: (value: any) => void;
}

const Container = styled.div<RadioProps>`
  .radio-label {
    margin-bottom: 2rem;
    font-size: 1rem;
    font-weight: 600;
    color: ${palette.gray_76};
  }

  .radio-list-wrapper {
    &::after {
      display: block;
      content: "";
      clear: both;
    }
  }

  label {
    display: flex;
    margin-bottom: 1.5rem;
    font-size: 1rem;
    line-height: 1.2;
    cursor: pointer;

    &:last-child {
      margin-bottom: 0;
    }
  }

  input[type="radio"] {
    flex-shrink: 0;
    margin: 0;
    margin-right: 12px;
    width: 1rem;
    height: 1rem;
    position: relative;
    border: 1px solid ${palette.gray_b0};
    border-radius: 50%;
    font-size: 1rem;
    appearance: none;
    --webkit-appearance: none;
    outline: none;
    cursor: pointer;

    ${({ isValid, validateMode }) => {
      if (validateMode) {
        if (!isValid) {
          return css`
            border-color: ${palette.tawny};
            background-color: ${palette.snow};
          `;
        }
        return css`
          border-color: ${palette.daryCyan};
        `;
      }
    }}
  }

  input[type="radio"]:checked {
    background-color: ${palette.daryCyan};
    border: none;

    &:after {
      content: "";
      display: block;
      width: 6px;
      height: 6px;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: white;
      border-radius: 50%;
    }
  }

  .radio-description {
    display: block;
    margin-top: 5px;
  }

  .radio-group-warning {
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

const RadioGroup: React.FC<Props> = ({
  isValid,
  label,
  options,
  errorMessage,
  value,
  onChange,
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container isValid={!!isValid} validateMode={!!validateMode}>
      <p className="radio-label">{label}</p>
      <div className="radio-list-wrapper">
        {options?.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
            />
            <span>
              {option.label}
              <span className="radio-description">{option.description}</span>
            </span>
          </label>
        ))}
      </div>
      {validateMode && !isValid && (
        <div className="radio-group-warning">
          <WarningIcon />
          <p>{errorMessage}</p>
        </div>
      )}
    </Container>
  );
};

export default RadioGroup;
