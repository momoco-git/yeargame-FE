import '@styles/globals.css';
import type { AppProps } from 'next/app';
import GlobalStyle from '@styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
function MyApp({ Component, pageProps }: AppProps) {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <div className=" from-red-100 via-red-300 to-blue-500 bg-gradient-to-br h-screen w-screen ">
        <GlobalStyle />
        <Component {...pageProps} />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
