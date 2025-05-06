import axios from "@/lib/axios";
import { Document, DocumentParticipant } from "@/types/document";
import {
  AddParticipantToDocumentRequest,
  AddParticipantToDocumentResponse,
  CreateDocumentRequest,
} from "./types";
import { Category } from "@/types/category";

const RESOURCE = "/documents/";

export const fetchDocumentsList = async (
  page: number = 1,
  pageSize: number = 20
): Promise<{ data: Document[]; totalPages: number; totalItems: number }> => {
  const response = await axios.get<{ data: Document[] }>(RESOURCE, {
    params: {
      page,
      page_size: pageSize,
    },
  });

  return {
    data: response.data.data,
    totalPages: 2000 / pageSize,
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
  data: AddParticipantToDocumentRequest
): Promise<AddParticipantToDocumentResponse> => {
  const response = await axios.post<AddParticipantToDocumentResponse>(
    `${RESOURCE}participants/${documentId}`,
    data
  );

  return response.data;
};

export const createDocument = async (
  data: CreateDocumentRequest
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
