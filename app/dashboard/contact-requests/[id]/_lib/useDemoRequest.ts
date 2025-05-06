'use client'

import { fetchContactUs } from "@/api/contact-us";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useContactRequest() {
  const params = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["contact-request", params["id"]],
    queryFn: async () => {
      const res = await fetchContactUs(params["id"] as string);
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
