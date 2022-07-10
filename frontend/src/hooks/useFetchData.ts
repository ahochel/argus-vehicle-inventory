import { useEffect, useState } from 'react';

export enum HTTPMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

const useFetchData = <T>(method: HTTPMethods, url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);
  const triggerFetch = () => {
    setFetchCount(fetchCount + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await fetch(url, { method });
        const result: T = await response.json();

        setData(result);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [method, url, fetchCount]);

  return { data, isLoading, isError, triggerFetch };
};

export default useFetchData;
