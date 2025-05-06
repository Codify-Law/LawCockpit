import { vectorizeDocument } from "@/api/documents";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";

export default function useVectorizationDocument() {
  const params = useParams();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const { isPending, mutate: vectorize } = useMutation({
    mutationFn: async () => {
      if (!params.id) return;

      const response = await vectorizeDocument(params.id as string);
      return response;
    },
    onSuccess: (data) => {
      if (data?.message === "Vectorization started") {
        toast.success(
          "Document vectorization process has started successfully.",
          {
            richColors: true,
          }
        );
      } else {
        toast.error(
          "An error occurred during starting the document vectorization.",
          {
            richColors: true,
          }
        );
      }
    },
    onError: () => {
      toast.error(
        "An error occurred during starting the document vectorization.",
        {
          richColors: true,
        }
      );
    },
    onSettled: () => {
      if (closeButtonRef.current) closeButtonRef.current.click();
    },
  });

  return {
    variables: {
      isPending,
      closeButtonRef,
    },
    methods: {
      vectorize,
    },
  };
}
