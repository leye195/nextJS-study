import React from "react";
import { useSelector } from "store";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

const Container = styled.div<{ isValid: boolean; validateMode: boolean }>`
  width: 100%;
  height: 46px;

  ${({ isValid, validateMode }) =>
    validateMode &&
    css`
      select {
        border-color: ${isValid ? palette.daryCyan : palette.tawny} !important;
        backgroun-color: ${isValid ? "white" : palette.snow};
      }
    `}

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
    -webkit-appearance: none;

    &:focus {
      border-color: ${palette.daryCyan};
    }
  }
`;

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  disabledOptions?: string[];
  value?: string;
  isValid: boolean;
}

const Selector: React.FC<Props> = ({
  disabledOptions = [],
  options = [],
  isValid,
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container isValid={isValid} validateMode={validateMode}>
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
    </Container>
  );
};

export default Selector;
