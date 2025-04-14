"use client"
import { fetchDocument } from "@/api/documents";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useDocument() {
  const params = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["document", params["id"]],
    queryFn: async () => {
      const res = await fetchDocument(params["id"] as string);
      return res;
    },
  });

  return {
    variables: {
      isLoading,
      data,
      isError,
    },
  };
}
