"use client";

import { fetchDocumentsList } from "@/api/documents";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { useDebounce } from "use-debounce";

export default function useDocuments() {
  const searchParams = useSearchParams();
  const [keyword, setKeword] = useState("");
  const [debouncedKeyword] = useDebounce(keyword, 500);

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = useRef(20);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["documents", page, pageSize, debouncedKeyword],
    queryFn: async () => {
      const res = await fetchDocumentsList(
        page,
        pageSize.current,
        debouncedKeyword
      );
      return res;
    },
    staleTime: 5000,
    placeholderData: (previousData) => previousData,
  });

  return {
    variables: {
      isLoading,
      isFetching,
      data,
      isError,
      currentPage: page,
      itemsPerPage: pageSize,
      current_page: page,
      totalPages: data?.totalPages || 0,
      totalItems: data?.totalItems || 0,
      keyword,
      pageSize,
    },
    set: {
      setKeword,
    },
  };
}
