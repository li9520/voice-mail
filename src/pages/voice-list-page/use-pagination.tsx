import { useState } from "react";

type ReturnType = {
  page: number;
  changePage: (value: number) => void;
};
export function usePagination(): ReturnType {
  const [page, setPage] = useState(1);

  const changePage = (value: number) => {
    setPage(value);
  };
  return {
    page,
    changePage,
  };
}
