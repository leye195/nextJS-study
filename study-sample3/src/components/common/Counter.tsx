import React from "react";
import styled from "styled-components";
import Colors from "styles/color";
import PlusIcon from "../../../public/static/svg/common/counter/plus.svg";
import MinusIcon from "../../../public/static/svg/common/counter/minus.svg";

interface Props {
  label?: string;
  description?: string;
  value?: number;
  minValue?: number;
  maxValue?: number;
  increaseNum?: number;
  onChange: (value: number) => () => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  .counter-label {
    font-size: 1rem;
    font-weight: 600;
    color: ${Colors["gray48" as string]};
  }

  .counter-description {
    display: block;
    font-size: 14px;
    font-weight: 400;
    color: ${Colors["gray71" as string]};
  }

  .counter-contents {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 120px;

    & button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      color: ${Colors["darkCyan" as string]};
      background-color: white;
      border: 1px solid ${Colors["darkCyan" as string]};
      border-radius: 50%;
      outline: none;
      cursor: pointer;

      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }
  }
`;

const Counter: React.FC<Props> = ({
  label,
  description,
  value,
  minValue,
  maxValue,
  increaseNum,
  onChange,
}) => {
  return (
    <Container>
      <label className="counter-label">
        {label}
        {description && (
          <span className="counter-description">{description}</span>
        )}
      </label>
      <div className="counter-contents">
        <button
          type="button"
          disabled={value === minValue}
          onClick={onChange((value as number) - (increaseNum as number))}
        >
          <MinusIcon />
        </button>
        <p>{value}</p>
        <button
          type="button"
          disabled={value === maxValue}
          onClick={onChange((value as number) + (increaseNum as number))}
        >
          <PlusIcon />
        </button>
      </div>
    </Container>
  );
};

export default React.memo(Counter);
