import React, { useState } from "react";
import { useRouter } from "next/router";
import css from "styled-jsx/css";
import { IoLogoGithub } from "react-icons/io";

const HeaderCss = css`
  .header-wrapper {
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #24292e;
    line-height: 0;
  }

  .header-search-form input {
    margin: 0 1rem;
    background-color: hsla(0, 0%, 100%, 0.125);
    width: 300px;
    height: 1.5rem;
    border: 0;
    border-radius: 5px;
    outline: none;
    color: white;
    padding: 0 12px;
    font-size: 0.7rem;
    font-weight: 800;
  }

  .header-navigations a {
    color: white;
    margin-right: 1rem;
    font-size: 0.7rem;
    font-weight: 800;
    text-decoration: none;
  }
`;

const Header = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    router.push(`/users/${username}`);
    setUsername("");
  };

  return (
    <div>
      <div className="header-wrapper">
        <IoLogoGithub color="white" size={36} />
        <form className="header-search-form" onSubmit={onSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </form>
        <nav className="header-navigations">
          <a href="https://github/pulls">Pull requests</a>
          <a href="https://github/issues">Issues</a>
          <a href="https://marketplace">Marketplace</a>
          <a href="https://github.com/explore">Explore</a>
        </nav>
      </div>

      <style jsx>{HeaderCss}</style>
    </div>
  );
};

export default Header;
