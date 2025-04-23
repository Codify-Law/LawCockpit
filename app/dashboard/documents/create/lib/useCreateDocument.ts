import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentFormData, documentSchema } from "./schema";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createDocument, fetchDocumentsCategoriesList } from "@/api/documents";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useCreateDocument() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema),
  });

  const onSubmit = (data: DocumentFormData) => {
    createDocumentMutation.mutate(data);
    // Handle form submission
  };

  const createDocumentMutation = useMutation({
    mutationFn: async (data: DocumentFormData) => {
      const response = await createDocument({
        title: data.title,
        category_id: data.category_id,
        file_path: "", // data.file_path,
        document_type:
          data.document_type === "judgement" ? "judgment" : "treaty",
        conclusion_info: data.conclusion_info,
        eif_info: data.eif_info,
        attachment_info: data.attachment_info,
        authentic_texts: data.authentic_texts
          .split(",")
          .map((item) => item.trim()), // []
        subject_terms: data.subject_terms.split(",").map((item) => item.trim()), // []
        agreement_type: data.agreement_type,
      });

      return response;
    },
    onSuccess: () => {
      router.push("/dashboard/documents");
    },
    onError: () => {
      reset();
      toast.error("Something went wrong. Please try again.");
    },
  });

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetchDocumentsCategoriesList();
      return response;
    },
  });

  return {
    variables: {
      errors,
      categories,
      isLoadingCategories,
      isErrorCategories,
    },
    methods: {
      register,
      handleSubmit,
      onSubmit,
      setValue,
      watch,
    },
  };
}
