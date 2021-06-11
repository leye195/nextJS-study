import { AppProps } from "next/app";
import Header from "components/Header";
import Footer from "components/Footer";
import { wrapper } from "store";
import GlobalStyle from "../styles/GlobalStyle";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export default wrapper.withRedux(app);
