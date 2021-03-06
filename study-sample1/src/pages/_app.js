import Header from "components/header";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <style jsx global>
        {`
          body {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Noto Sans, Noto Sans KR;
          }
        `}
      </style>
    </>
  );
};

export default App;
