import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";
import palette from "./palette";

const globalStyle = css`
  ${reset};

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Noto Sans, Noto Sans KR;
    color: ${palette.black_22};
  }

  a {
    text-decoration: none;
    color: ${palette.black_22};
  }

  li {
    list-style: none;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${globalStyle}
`;

export default GlobalStyle;
