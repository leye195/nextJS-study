import React from "react";
import styled from "styled-components";
import palette from "styles/palette";
import Colors from "styles/color";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  width?: string;
  height?: string;
}

const Container = styled.button<{
  color: string;
  width?: string;
  height?: string;
}>`
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: 4px;
  background-color: ${({ color }) => Colors[color]};
  color: white;
  font-size: 1rem;
  font-weight: 800;
  outline: none;
  cursor: pointer;
`;

const Button: React.FC<Props> = ({
  children,
  color = "bitterSweet",
  ...props
}) => {
  return (
    <Container color={color} {...props}>
      {children}
    </Container>
  );
};

export default React.memo(Button);
