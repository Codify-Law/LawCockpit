import { fetchDocumentsList } from "@/api/documents";
import { useQuery } from "@tanstack/react-query";

export default function useDocuments() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["documents"],
    queryFn: async () => {
      const res = await fetchDocumentsList();
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
