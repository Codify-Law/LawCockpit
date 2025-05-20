import axios from "@/lib/axios";
import { Document, DocumentParticipant } from "@/types/document";
import {
  AddParticipantToDocumentPayload,
  AddParticipantToDocumentResponse,
  CreateDocumentPayload,
  DocumentSection,
  UpdateDocumentPayload,
} from "./types";
import { Category } from "@/types/category";

const RESOURCE = "/documents/";

export const fetchDocumentsList = async (
  data: {
    page?: number;
    pageSize?: number;
    keyword?: string;
    vectorCreationStatus?: "pending" | "started" | "completed" | "failed";
    documentType?: "treaty" | "judgement";
    categoryId?: string;
    authenticTexts?: string[];
    subjectTerms?: string[];
    agreementType?: string[];
  } = { page: 1, pageSize: 20 }
): Promise<{ data: Document[]; totalPages: number; totalItems: number }> => {
  const response = await axios.get<{ data: Document[] }>(RESOURCE, {
    params: {
      page: data.page,
      page_size: data.pageSize,
      keyword: data.keyword,
      vector_creation_status: data.vectorCreationStatus,
      document_type:
        data.documentType === "judgement" ? "judgment" : data.documentType,
      category_id: data.categoryId,
      authentic_texts: data.authenticTexts,
      subject_terms: data.subjectTerms,
      agreement_type: data.agreementType,
    },
  });

  return {
    data: response.data.data,
    totalPages: 2000 / (data.pageSize || 20),
    totalItems: 2000,
  };
};

export const fetchDocumentsCategoriesList = async (): Promise<Category[]> => {
  const response = await axios.get<{ data: Category[] }>(
    `${RESOURCE}categories`,
    {}
  );

  return response.data.data;
};

export const fetchDocument = async (documentId: string): Promise<Document> => {
  const response = await axios.get<Document>(`${RESOURCE}${documentId}`);

  return response.data;
};

export const fetchDocumentParticipants = async (
  documentId: string
): Promise<DocumentParticipant[]> => {
  const response = await axios.get<{ data: DocumentParticipant[] }>(
    `${RESOURCE}participants/${documentId}`,
    {
      params: {
        page: 1,
        page_size: 20,
      },
    }
  );

  return response.data.data;
};

export const addParticipantToDocument = async (
  documentId: string,
  data: AddParticipantToDocumentPayload
): Promise<AddParticipantToDocumentResponse> => {
  const response = await axios.post<AddParticipantToDocumentResponse>(
    `${RESOURCE}participants/${documentId}`,
    data
  );

  return response.data;
};

export const createDocument = async (
  data: CreateDocumentPayload
): Promise<Document> => {
  const response = await axios.post<Document>(RESOURCE, data);
  return response.data;
};

export const vectorizeDocument = async (documentId: string) => {
  const response = await axios.post<{ message: string }>(
    `${RESOURCE}${documentId}/vectorize`,
    {}
  );
  return response.data;
};

export const updateDocument = async (
  documentId: string,
  data: UpdateDocumentPayload
) => {
  const response = await axios.put<Document>(`${RESOURCE}${documentId}`, {
    data,
  });

  return response.data;
};

export const fetchDocumentSections = async (data: {
  documentId: string;
  fromOrder: number | null;
  toOrder: number | null;
  fromPageNumber: number | null;
  toPageNumber: number | null;
  page: number | null;
  page_size: number | null;
}): Promise<DocumentSection[]> => {
  const response = await axios.get<{ data: DocumentSection[] }>(
    `${RESOURCE}documents/${data.documentId}/sections`,
    {
      params: {
        from_order: data.fromOrder,
        to_order: data.toOrder,
        from_page_number: data.page,
        to_page_number: data.page,
        page: data.page ?? 1,
        page_size: data.page_size ?? 20,
      },
    }
  );

  return response.data.data;
};

export const updateSection = async (data: {
  sectionId: string;
  documentId: string;
  text: string;
}) => {
  const response = await axios.put<DocumentSection>(
    `${RESOURCE}documents/${data.documentId}/sections/${data.sectionId}`,
    {
      data,
    }
  );

  return response.data;
};
