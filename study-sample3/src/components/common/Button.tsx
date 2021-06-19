import React from "react";
import styled from "styled-components";
import palette from "styles/palette";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Container = styled.button`
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: 4px;
  background-color: ${palette.bittersweet};
  color: white;
  font-size: 1rem;
  font-weight: 800;
  outline: none;
  cursor: pointer;
`;

const Button: React.FC<Props> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default React.memo(Button);
