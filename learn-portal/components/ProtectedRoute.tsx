// import { useRouter } from 'next/router';
// import { useEffect, ReactNode } from 'react';

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     // If no token, redirect to the authentication page
//     if (!token) {
//       router.replace(`/authentication?redirect=${router.pathname}`);
//     }
//   }, [router]);

//   // Render children if authenticated
//   const token = localStorage.getItem('token');
//   if (!token) {
//     return null; // Return null while redirecting
//   }

//   return <>{children}</>;
// }

// import { useRouter } from 'next/router';
// import { useEffect, ReactNode } from 'react';
// import {jwtDecode} from 'jwt-decode'; // Install with `npm install jwt-decode`
// import { notifications } from '@mantine/notifications';

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// interface DecodedToken {
//   exp: number; // Expiration timestamp
//   [key: string]: any; // Other fields in the token
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     if (!token) {
//       // Redirect if no token is found
//       handleRedirect('Authentication required', 'Please log in to access this page.');
//       return;
//     }

//     try {
//       const decoded: DecodedToken = jwtDecode(token);
//       const currentTime = Date.now() / 1000; // Current time in seconds

//       if (decoded.exp < currentTime) {
//         // Token has expired
//         handleRedirect('Session expired', 'Your session has expired. Please log in again.');
//         return;
//       }
//     } catch (error) {
//       // Token is invalid
//       handleRedirect('Invalid session', 'Your session is invalid. Please log in again.');
//       return;
//     }
//   }, [router]);

//   const handleRedirect = (title: string, message: string) => {
//     // Show notification
//     notifications.show({
//       title,
//       message,
//       color: 'red',
//       position: 'top-right',
//     });

//     // Remove invalid or expired token
//     localStorage.removeItem('token');

//     // Redirect to authentication with the desired route as a query parameter
//     router.replace(`/authentication?redirect=${router.pathname}`);
//   };

//   // Render children if authenticated and token is valid
//   const token = localStorage.getItem('token');
//   if (!token) {
//     return null; // Return null while redirecting
//   }

//   return <>{children}</>;
// }

// import { useRouter } from 'next/router';
// import { useEffect, ReactNode, useState } from 'react';
// import { useLocalStorage } from '@mantine/hooks';
// import {jwtDecode} from 'jwt-decode'; // Install with `npm install jwt-decode`
// import { notifications } from '@mantine/notifications';

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// interface DecodedToken {
//   exp: number; // Expiration timestamp
//   [key: string]: any; // Other fields in the token
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const router = useRouter();
//   const [token, setToken] = useLocalStorage<string | null>({
//     key: 'token',
//     defaultValue: null, // Default to null if no token exists
//   });
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   useEffect(() => {
//     if (!token) {
//       handleRedirect('Authentication required', 'Please log in to access this page.');
//       return;
//     }

//     try {
//       const decoded: DecodedToken = jwtDecode(token);
//       const currentTime = Date.now() / 1000; // Current time in seconds

//       if (decoded.exp < currentTime) {
//         // Token has expired
//         handleRedirect('Session expired', 'Your session has expired. Please log in again.');
//         return;
//       }

//       // If token is valid, allow access
//       setIsAuthenticated(true);
//     } catch (error) {
//       // Token is invalid
//       handleRedirect('Invalid session', 'Your session is invalid. Please log in again.');
//       return;
//     }
//   }, [token, router]);

//   const handleRedirect = (title: string, message: string) => {
//     // Show notification
//     notifications.show({
//       title,
//       message,
//       color: 'red',
//       position: 'top-right',
//     });

//     // Remove invalid or expired token
//     // setToken(null);

//     // Redirect to authentication with the desired route as a query parameter
//     router.replace(`/authentication?redirect=${router.pathname}`);
//   };

//   // Show nothing while checking authentication
//   if (!isAuthenticated) {
//     return null;
//   }

//   // Render children if authenticated and token is valid
//   return <>{children}</>;
// }


// import { useRouter } from 'next/router';
// import { useEffect, ReactNode, useState } from 'react';
// import { useLocalStorage } from '@mantine/hooks';
// import {jwtDecode} from 'jwt-decode'; // Ensure you install with `npm install jwt-decode`
// import { notifications } from '@mantine/notifications';

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// interface DecodedToken {
//   exp: number; // Expiration timestamp
//   [key: string]: any; // Other fields in the token
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const router = useRouter();
//   const [token, setToken] = useLocalStorage<string | null>({
//     key: 'token',
//     defaultValue: null, // Default to null if no token exists
//   });
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   useEffect(() => {
//     const checkAuthentication = () => {
//       console.log("CURRENT TOKEN: ",token);
      
//       if (!token) {
//         handleRedirect('Authentication required', 'Please log in to access this page.');
//         return;
//       }

//       try {
//         const decoded: DecodedToken = jwtDecode(token);
//         const currentTime = Date.now() / 1000; // Current time in seconds

//         if (decoded.exp < currentTime) {
//           // Token has expired
//           handleRedirect('Session expired', 'Your session has expired. Please log in again.');
//           return;
//         }

//         // If token is valid, allow access
//         setIsAuthenticated(true);
//       } catch (error) {
//         // Token is invalid
//         handleRedirect('Invalid session', 'Your session is invalid. Please log in again.');
//         return;
//       }
//     };

//     checkAuthentication();
//   }, [token, router]);

//   const handleRedirect = (title: string, message: string) => {
//     // Show notification
//     notifications.show({
//       title,
//       message,
//       color: 'red',
//       position: 'top-right',
//     });

//     // Remove invalid or expired token
//     setToken(null);

//     // Redirect to authentication with the desired route as a query parameter
//     router.replace(`/authentication?redirect=${router.pathname}`);
//   };

//   // Show nothing while checking authentication
//   if (!isAuthenticated) {
//     return null;
//   }

//   // Render children if authenticated and token is valid
//   return <>{children}</>;
// }

import { useRouter } from 'next/router';
import { useEffect, ReactNode, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; // Ensure you install with `npm install jwt-decode`
import { notifications } from '@mantine/notifications';

interface ProtectedRouteProps {
  children: ReactNode;
}

interface DecodedToken {
  exp: number; // Expiration timestamp
  [key: string]: any; // Other fields in the token
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage

      // console.log("CURRENT TOKEN: ", token);

      if (!token) {
        handleRedirect('Authentication required', 'Please log in to access this page.');
        return;
      }

      try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decoded.exp < currentTime) {
          // Token has expired
          handleRedirect('Session expired', 'Your session has expired. Please log in again.');
          return;
        }

        // If token is valid, allow access
        setIsAuthenticated(true);
      } catch (error) {
        // Token is invalid
        handleRedirect('Invalid session', 'Your session is invalid. Please log in again.');
        return;
      }
    };

    checkAuthentication();
  }, [router]);

  const handleRedirect = (title: string, message: string) => {
    // Show notification
    notifications.show({
      title,
      message,
      color: 'red',
      position: 'top-right',
    });

    // Remove invalid or expired token
    localStorage.removeItem('token'); // Clear token from localStorage

    // Redirect to authentication with the desired route as a query parameter
    router.replace(`/authentication?redirect=${router.pathname}`);
  };

  // Show nothing while checking authentication
  if (!isAuthenticated) {
    return null;
  }

  // Render children if authenticated and token is valid
  return <>{children}</>;
}
