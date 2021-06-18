import App, { AppContext, AppProps } from "next/app";
import { wrapper } from "store";
import Header from "components/Header";
import GlobalStyle from "styles/GlobalStyle";
import api from "lib/api";
import { cookieParser } from "lib/utils";
import { meAPI } from "lib/api/auth";
import { userActions } from "store/user";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};

app.getInitialProps = wrapper.getInitialAppProps(
  (store) => async (context: AppContext) => {
    const appInitialProps = await App.getInitialProps(context);

    const { access_token: accessToken } = cookieParser(
      context.ctx.req?.headers.cookie,
    );

    const { isLoggedIn } = store.getState().user;

    try {
      if (!isLoggedIn && accessToken) {
        api.defaults.headers.cookie = accessToken;
        const { data } = await meAPI();

        store.dispatch(userActions.setLoggedUser(data));
      }
    } catch (err) {
      console.error(err);
    }

    return {
      ...appInitialProps,
    };
  },
);

export default wrapper.withRedux(app);
