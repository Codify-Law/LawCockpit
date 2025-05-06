"use client";

import { fetchDemoRequestsList } from "@/api/demo-requests";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function useDemoRequests() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = 20;

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["demo-requests", page, pageSize],
    queryFn: async () => {
      const res = await fetchDemoRequestsList(page, pageSize);
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
    },
  };
}
