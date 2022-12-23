import '@styles/globals.css';
import type { AppProps } from 'next/app';
import GlobalStyle from '@styles/GlobalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className=" from-red-100 via-red-300 to-blue-500 bg-gradient-to-br h-screen w-screen ">
        <GlobalStyle />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
