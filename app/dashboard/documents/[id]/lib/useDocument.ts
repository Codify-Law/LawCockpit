"use client";
import { fetchDocument, fetchDocumentParticipants } from "@/api/documents";
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

  const {
    data: participantsData,
    isLoading: participantsLoading,
    isError: participantsError,
  } = useQuery({
    queryKey: ["documentParticipants", params["id"]],
    queryFn: async () => {
      const res = await fetchDocumentParticipants(params["id"] as string);
      return res;
    },
  });

  return {
    variables: {
      isLoading,
      data,
      isError,
      participantsData,
      participantsLoading,
      participantsError,
    },
  };
}
