import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";

const Container = styled.div`
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
}

const Selector: React.FC<Props> = ({
  disabledOptions = [],
  options = [],
  ...props
}) => {
  return (
    <Container>
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
