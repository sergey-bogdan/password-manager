import { useEffect, useState } from "react";

export default function useResource<T>(fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const isLoading = !data && !error;

  useEffect(() => {
    fetcher()
      .then((data) => {
        setData(data)
      })
      .catch((error) => {
        setError(error)
      });
  }, [fetcher]);

  return {
    data,
    error,
    isLoading,
  }
}
