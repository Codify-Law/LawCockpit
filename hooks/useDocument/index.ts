"use client";
import {
  fetchDocument,
  fetchDocumentParticipants,
  fetchDocumentsCategoriesList,
  fetchDocumentSections,
  updateDocument,
  updateSection,
} from "@/api/documents";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { documentSchema, UpdateDocumentPayload } from "./schema";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

export default function useDocument() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionPerPage = useRef(5);
  const [editMode, setEditMode] = useState(false);
  const documentId = params.id as string;

  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingSectionText, setEditingSectionText] = useState("");

  const defaultValues = useMemo<UpdateDocumentPayload>(
    () => ({
      title: "",
      category_id: "",
      document_type: "treaty",
      conclusion_info: "",
      eif_info: "",
      attachment_info: "",
      authentic_texts: [],
      subject_terms: [],
      agreement_type: "",
    }),
    []
  );

  const form = useForm<UpdateDocumentPayload>({
    resolver: zodResolver(documentSchema),
    defaultValues,
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchDocumentsCategoriesList,
  });

  const {
    data: documentData,
    isLoading: isLoadingDocument,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["document", documentId],
    queryFn: () => fetchDocument(documentId),
  });

  const {
    data: participantsData,
    isLoading: participantsLoading,
    isError: participantsError,
  } = useQuery({
    queryKey: ["documentParticipants", documentId],
    queryFn: () => fetchDocumentParticipants(documentId),
  });

  const {
    isLoading: isLoadingSections,
    isFetching: isFetchingSections,
    data: sections,
  } = useQuery({
    queryKey: ["documentSections", params["id"], searchParams.get("page")],
    queryFn: async () => {
      const currentPage = Number(searchParams.get("page") ?? 1);
      const fromOrder = (currentPage - 1) * sectionPerPage.current;
      const toOrder = currentPage * sectionPerPage.current - 1;

      const response = await fetchDocumentSections({
        documentId: params["id"] as string,
        fromOrder,
        toOrder,
        fromPageNumber: null,
        toPageNumber: null,
        page: null,
        page_size: null,
      });
      return response;
    },
  });

  const { mutate: updateDocumentMutation, isPending: isUpdating } = useMutation(
    {
      mutationFn: async () => {
        const values = form.getValues();
        return await updateDocument(documentId, {
          title: values.title,
          category_id: values.category_id,
          document_type: values.document_type,
          conclusion_info: values.conclusion_info,
          eif_info: values.eif_info,
          attachment_info: values.attachment_info ?? "",
          authentic_texts: values.authentic_texts,
          subject_terms: values.subject_terms,
          agreement_type: values.agreement_type,
        });
      },
      onSuccess: () => {
        toast.success("Document updated.");
        router.push(`/dashboard/documents/${documentId}`);
      },
      onError: () => {
        toast.error("An error occurred.");
      },
    }
  );

  const { mutate: updateSectionMutation, isPending: isUpdatingSection } =
    useMutation({
      mutationFn: async (data: {
        sectionId: string;
        documentId: string;
        text: string;
      }) => {
        const response = await updateSection(data);
        return response;
      },
      onSuccess: () => {
        toast.success("Section updated successfully.");
        handleEditSection(null, "");
      },
      onError: () => {
        toast.error("An error occurred while updating.");
      },
    });

  useEffect(() => {
    if (!isFetching && documentData) {
      const normalizedType =
        documentData.document_type === "judgment"
          ? "judgement"
          : documentData.document_type;

      form.reset({
        title: documentData.title,
        category_id: documentData.category.id,
        document_type: normalizedType,
        conclusion_info: documentData.conclusion_info,
        eif_info: documentData.eif_info,
        attachment_info: documentData.attachment_info ?? "",
        authentic_texts: documentData.authentic_texts,
        subject_terms: documentData.subject_terms,
        agreement_type: documentData.agreement_type,
      });
    }
  }, [isFetching, documentData, form]);

  const handleEditSection = (sectionId: string | null, sectionText: string) => {
    setEditingSectionId(sectionId);
    setEditingSectionText(sectionText);
  };

  return {
    variables: {
      isLoading: isLoadingDocument || isFetching,
      isError,
      documentData,
      participantsData,
      participantsLoading,
      participantsError,
      editMode,
      form,
      categories,
      isLoadingCategories,
      isUpdating,
      isLoadingSections,
      isFetchingSections,
      sections,
      editingSectionId,
      editingSectionText,
      isUpdatingSection,
      currentSectionsPage: Number(searchParams.get("page") ?? "1"),
      sectionPerPage: sectionPerPage.current,
    },
    set: {
      setEditMode,
      setEditingSectionText,
    },
    methods: {
      updateDocumentMutation,
      handleEditSection,
      updateSectionMutation,
    },
  };
}
