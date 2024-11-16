import '@mantine/core/styles.css';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { Notifications } from '@mantine/notifications';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { theme } from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Umsebe - Support Portal</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Notifications />
      <Component {...pageProps} />
    </MantineProvider>
  );
}