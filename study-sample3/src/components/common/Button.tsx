import React from "react";
import styled, { css } from "styled-components";
import Colors from "styles/color";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  colorReverse?: boolean;
  styleType: "normal" | "register";
  icon?: JSX.Element;
}

const normalButtonStyle = css`
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  font-weight: 800;
`;

const registerButtonStyle = css`
  width: 161px;
  height: 45px;
  background-color: white;
  border: 1px solid ${Colors["grayC4" as string]};
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: 800;
`;

const Container = styled.button<{
  color: string;
  colorReverse: boolean;
  styleType: "normal" | "register";
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ styleType }) => styleType === "normal" && normalButtonStyle}
  ${({ styleType }) => styleType === "register" && registerButtonStyle}
  ${({ colorReverse, color }) => {
    if (colorReverse) {
      return css`
        border: 2px solid ${Colors[color]};
        color: ${Colors[color]};
        background-color: white;
      `;
    }

    return css`
      background-color: ${Colors[color]};
      color: ${color !== "white" ? "white" : "black"};
    `;
  }}
  outline: none;
  cursor: pointer;

  & svg {
    margin-right: 12px;
  }
`;

const Button: React.FC<Props> = ({
  children,
  colorReverse = false,
  color = "bitterSweet",
  styleType = "normal",
  icon,
  ...props
}) => {
  return (
    <Container
      color={color}
      colorReverse={colorReverse}
      styleType={styleType}
      {...props}
    >
      {icon}
      {children}
    </Container>
  );
};

export default React.memo(Button);
