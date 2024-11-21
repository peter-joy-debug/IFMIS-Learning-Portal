// import '@mantine/core/styles.css';
// import { useRouter } from 'next/router';
// import type { AppProps } from 'next/app';
// import { Notifications } from '@mantine/notifications';
// import Head from 'next/head';
// import { MantineProvider } from '@mantine/core';
// import { theme } from '../theme';
// import { ModalsProvider } from '@mantine/modals';
// import ProtectedRoute from '../components/ProtectedRoute';

// const protectedRoutes = [
//   '/dashboard',
//   '/ticket',
//   '/reply',
//   '/assign',
//   '/shared',
//   '/status',
// ];

// export default function App({ Component, pageProps, router }: AppProps) {
//   if (protectedRoutes.includes(router.pathname)) {
//     return (
//       <ProtectedRoute>
//         <Component {...pageProps} />
//       </ProtectedRoute>
//     );
//   }
//   return (
//     <MantineProvider theme={theme}>
//       <Head>
//         <title>Umsebe - Support Portal</title>
//         <meta
//           name="viewport"
//           content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
//         />
//         <link rel="shortcut icon" href="/favicon.svg" />
//       </Head>
//       <Notifications />
//       <ModalsProvider>
//       <Component {...pageProps} />
//       </ModalsProvider>
//     </MantineProvider>
//   );
// }

import '@mantine/core/styles.css';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { Notifications } from '@mantine/notifications';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import ProtectedRoute from '../components/ProtectedRoute';
import { theme } from '../theme';

const protectedRoutes = [
  '/dashboard',
  '/ticket',
  '/reply',
  '/assign',
  '/shared',
  '/status',
];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Check if the current route is a protected route
  const isProtectedRoute = protectedRoutes.includes(router.pathname);

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
      <ModalsProvider>
        {isProtectedRoute ? (
          // Wrap protected routes with ProtectedRoute
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        ) : (
          // Render components directly for non-protected routes
          <Component {...pageProps} />
        )}
      </ModalsProvider>
    </MantineProvider>
  );
}
