import { AppProps } from "next/app";
import Header from "components/Header";
import GlobalStyle from "../styles/GlobalStyle";

const app = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalStyle />
    <Header />
    <Component {...pageProps} />
  </>
);

export default app;
