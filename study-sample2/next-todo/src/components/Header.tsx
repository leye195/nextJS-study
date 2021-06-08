import React from "react";
import styled from "styled-components";
import palette from "../styles/palette";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 0 1rem;
  border-bottom: 1px solid ${palette.gray};

  h1 {
    font-size: 21px;
  }
`;

const Header: React.FC = () => {
  return (
    <Container>
      <h1>DanYJ's TodoList</h1>
    </Container>
  );
};

export default Header;
