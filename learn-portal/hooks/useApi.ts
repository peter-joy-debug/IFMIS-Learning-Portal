

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

