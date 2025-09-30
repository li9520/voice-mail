import { useCallback, useEffect, useState } from "react";

export function useLoad<T>(
  fetcher: () => Promise<T>,
  deps: unknown[],
  key = "default"
) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = useCallback(() => {
    return fetcher().then(setData);
  }, [...deps]);

  useEffect(() => {
    if (!key) {
      return;
    }
    setIsLoading(true);
    fetchList().finally(() => setIsLoading(false));
  }, [fetchList, key]);

  return {
    data,
    isLoading,
    refetch: fetchList,
  };
}
