import React from "react";
import styled, { css } from "styled-components";
import Colors from "styles/color";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  styleType: "normal" | "register";
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
  styleType: "normal" | "register";
}>`
  ${({ styleType }) => styleType === "normal" && normalButtonStyle}
  ${({ styleType }) => styleType === "register" && registerButtonStyle}
  background-color: ${({ color }) => Colors[color]};
  outline: none;
  cursor: pointer;
`;

const Button: React.FC<Props> = ({
  children,
  color = "bitterSweet",
  styleType = "normal",
  ...props
}) => {
  return (
    <Container color={color} styleType={styleType} {...props}>
      {children}
    </Container>
  );
};

export default React.memo(Button);
