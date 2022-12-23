import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Home from '@components/home';

const Homepage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Home></Home>
      </main>
    </div>
  );
};

export default Homepage;
