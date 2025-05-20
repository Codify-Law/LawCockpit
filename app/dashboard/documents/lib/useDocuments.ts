"use client";

import { fetchDocumentsList } from "@/api/documents";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { useDebounce } from "use-debounce";

export default function useDocuments() {
  const searchParams = useSearchParams();
  const [keyword, setKeword] = useState("");
  const [vectorCreationStatus, setVectorCreationStatus] = useState<
    "pending" | "started" | "completed" | "failed" | "all"
  >("all");
  const [documentType, setDocumentType] = useState<
    "treaty" | "judgement" | "all"
  >("all");
  const [categoryId, setCategoryId] = useState("");
  const [authenticTexts, setAuthenticTexts] = useState("");
  const [subjectTerms, setSubjectTerms] = useState("");
  const [agreementType, setAgreementType] = useState("");
  const [debouncedKeyword] = useDebounce(keyword, 500);

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = useRef(20);

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: [
      "documents",
      page,
      pageSize,
      debouncedKeyword,
      documentType,
      vectorCreationStatus,
    ],
    queryFn: async () => {
      const res = await fetchDocumentsList({
        page,
        pageSize: pageSize.current,
        keyword: debouncedKeyword ? debouncedKeyword : undefined,
        vectorCreationStatus:
          vectorCreationStatus === "all" ? undefined : vectorCreationStatus,
        documentType: documentType === "all" ? undefined : documentType,
      });
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
      vectorCreationStatus,
      documentType,
      categoryId,
      authenticTexts,
      subjectTerms,
      agreementType,
      pageSize,
    },
    set: {
      setKeword,
      setVectorCreationStatus,
      setDocumentType,
      setCategoryId,
      setAuthenticTexts,
      setSubjectTerms,
      setAgreementType,
    },
  };
}
