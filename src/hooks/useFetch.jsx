import { useCallback, useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useFetch = (endpoint, options = {}) => {
  const { initialValue = null, dependencies = [] } = options;

  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!endpoint) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}${endpoint}`);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message || "Failed to fetch data");
      // eslint-disable-next-line no-console
      console.error(`Error fetching ${endpoint}:`, error);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, ...dependencies]);

  const retry = () => {
    setError(null);
    return fetchData();
  };

  return { data, isLoading, error, retry };
};
