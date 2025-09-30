import { useLoad } from "../../hooks/use-load";

export type ListApi<T> = {
  list: (params: {
    page: number;
    count: number;
  }) => Promise<{ items: T[]; totalItems: number }>;
};

export function useList<T>(listApi: ListApi<T>, page = 1, count = 40) {
  const { data = { items: [], totalItems: 0 }, isLoading } = useLoad(
    () => listApi.list({ page, count }),
    [page]
  );

  return {
    data,
    isLoading,
  };
}
