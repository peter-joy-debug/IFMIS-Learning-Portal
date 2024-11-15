// import { useState, useEffect, useCallback } from 'react';
// import { AxiosResponse } from 'axios';
// import { userRoutes, ticketRoutes, faqRoutes } from '../utils/api';

// type ApiFunction<T> = (...args: any[]) => Promise<AxiosResponse<T>>;

// export const useApi = <T>(apiFunction: ApiFunction<T>, pollingInterval?: number) => {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = useCallback(async (...args: any[]) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await apiFunction(...args);
//       setData(response.data); // This should now work correctly
//     } catch (err: any) {
//       setError(err.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   }, [apiFunction]);

//   useEffect(() => {
//     if (pollingInterval) {
//       const intervalId = setInterval(() => {
//         fetchData();
//       }, pollingInterval);

//       return () => clearInterval(intervalId);
//     }
//   }, [fetchData, pollingInterval]);

//   return { data, loading, error, refetch: fetchData };
// };

// // Specific Hooks for Each Route

// // Users
// export const useGetAllUsers = () => useApi(userRoutes.getAllUsers);
// export const useGetUserById = (id: string) => useApi(() => userRoutes.getUserById(id));
// export const useLogin = () => useApi(userRoutes.login);
// export const useRegister = () => useApi(userRoutes.register);

// // Tickets
// export const useGetAllTickets = () => useApi(ticketRoutes.getAllTickets);
// export const useGetTicketById = (ticketId: string) =>
//   useApi(() => ticketRoutes.getTicketById(ticketId));
// export const useCreateTicket = () => useApi(ticketRoutes.createTicket);
// export const useUpdateTicket = () => useApi(ticketRoutes.updateTicket);
// export const useAddReply = () => useApi(ticketRoutes.addReply);
// export const useUpdateReply = () => useApi(ticketRoutes.updateReply);

// // FAQs
// export const useGetFAQs = () => useApi(faqRoutes.getFAQs);
// export const useCreateFAQ = () => useApi(faqRoutes.createFAQ);
// export const useUpdateFAQ = () => useApi(faqRoutes.updateFAQ);
// export const useDeleteFAQ = () => useApi(faqRoutes.deleteFAQ);


// import { useState, useEffect, useCallback } from 'react';
// import { AxiosResponse } from 'axios';
// import api from '../utils/api'; // Ensure the path is correct for your `api.ts`

// type ApiFunction<T> = (config: { method: string; url: string; data?: any }) => Promise<AxiosResponse<T>>;

// export const useApi = <T>() => {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = useCallback(async (config: { method: string; url: string; data?: any }) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api(config); // Use axios instance for dynamic request
//       setData(response.data);
//       return response; // Return response in case the component needs it
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Something went wrong');
//       throw err; // Rethrow for component-specific handling
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return { data, loading, error, fetchData };
// };

// import { useState, useEffect, useCallback } from 'react';
// import { AxiosResponse } from 'axios';
// import api from '../utils/api'; // Ensure the correct path to api.ts

// type ApiFunction<T> = (config: { method: string; url: string; data?: any }) => Promise<AxiosResponse<T>>;

// export const useApi = <T>() => {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = useCallback(async (config: { method: string; url: string; data?: any }) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api(config); // Correct usage of Axios instance
//       setData(response.data);
//       return response;
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Something went wrong');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return { data, loading, error, fetchData };
// };


import { useState, useEffect, useCallback } from 'react';
import { AxiosResponse } from 'axios';
import api from '../utils/api';

type ApiFunction<T> = (config: { method: string; url: string; params?: any; data?: any }) => Promise<AxiosResponse<T>>;

export const useApi = <T>(pollingInterval?: number) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (config: { method: string; url: string; params?: any; data?: any }) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api(config);
        setData(response.data);
        return response;
      } catch (err: any) {
        setError(err.response?.data?.message || 'Something went wrong');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (pollingInterval) {
      const interval = setInterval(() => {
        fetchData({ method: 'GET', url: '/faqs', params: { perPage: 7 } });
      }, pollingInterval);
      return () => clearInterval(interval);
    }
  }, [pollingInterval, fetchData]);

  return { data, loading, error, fetchData };
};

