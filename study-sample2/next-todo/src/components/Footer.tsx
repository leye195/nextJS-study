import { useRouter } from "next/dist/client/router";
import React from "react";
import styled from "styled-components";
import palette from "styles/palette";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.5rem;
  position: fixed;
  border-bottom: 1px solid ${palette.gray};
  background-color: white;

  .footer-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    font-size: 2rem;
    border-radius: 5px;
    border: 1px solid black;
    line-height: 0;
    outline: 0;
    background-color: white;
    cursor: pointer;
  }
`;

const Footer: React.FC = () => {
  const router = useRouter();
  const isMain = router.pathname === "/";

  const handleOnClick = () => {
    router.push(isMain ? "/todo/add" : "/");
  };

  return (
    <Container>
      <button className="footer-button" type="button" onClick={handleOnClick}>
        {isMain ? "+" : "-"}
      </button>
    </Container>
  );
};

export default Footer;
