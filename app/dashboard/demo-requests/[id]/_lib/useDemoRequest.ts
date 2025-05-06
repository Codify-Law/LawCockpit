'use client'

import { fetchDemoRequest } from "@/api/demo-requests";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useDemoRequest() {
  const params = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["demo-request", params["id"]],
    queryFn: async () => {
      const res = await fetchDemoRequest(params["id"] as string);
      return res;
    },
  });

  return {
    variables: {
      isLoading,
      data,
      isError,
    },
    methods: {},
  };
}
