import React from "react";
import styled from "styled-components";
import Colors from "styles/color";

interface Props {
  value?: string[];
  onChange: (selected: string[]) => void;
  options: string[];
}

const Container = styled.div`
  &:after {
    display: block;
    content: "";
    clear: both;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    position: relative;
    height: 18px;
    margin-bottom: 1.5rem;
    color: ${Colors["gray48" as string]};
    float: left;
    clear: both;
    cursor: pointer;
  }

  input::-ms-clear {
    display: none;
  }

  input[type="checkbox"] {
    margin: 0;
    width: 0;
    height: 0;
    border: 0;
    -webkit-appearance: none;
  }

  input[type="checkbox"]:checked {
    margin: 0;
    border: 0;
    -webkit-appearance: none;
  }
  input[type="checkbox"] + input {
    display: none;
  }

  input[type="checkbox"] + span {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 0.5rem;
    flex-shrink: 0;
  }

  input[type="checkbox"] + span::before {
    display: inline-table;
    content: "";
    width: 18px;
    height: 18px;
    position: absolute;
    top: 0;
    border: 1px solid ${Colors["grayB0" as string]};
    border-radius: 2px;
    box-sizing: border-box;
    background-color: white;
    cursor: pointer;
  }

  input[type="checkbox"]:checked + span::before {
    display: inline-table;
    content: "";
    width: 18px;
    height: 18px;
    position: absolute;
    border: 0;
    border-radius: 2px;
    background-color: ${Colors["darkCyan" as string]};
    background-image: url("/static/svg/checkbox/checkbox_mark.svg");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const CheckboxGroup: React.FC<Props> = ({
  value = [],
  onChange,
  options = [],
}) => {
  return (
    <Container>
      {options.map((option) => (
        <label className="checkbox-label" key={option}>
          <input
            type="checkbox"
            checked={value?.includes(option)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange([...value, option]);
              } else {
                onChange(value.filter((__option) => __option !== option));
              }
            }}
          />
          <span />
          {option}
        </label>
      ))}
    </Container>
  );
};

export default CheckboxGroup;
