import axios from "@/lib/axios";
import { Document, DocumentParticipant } from "@/types/document";
import {
  AddParticipantToDocumentRequest,
  AddParticipantToDocumentResponse,
} from "./types";

const RESOURCE = "/documents/";

export const fetchDocumentsList = async (): Promise<Document[]> => {
  const response = await axios.get<{ data: Document[] }>(RESOURCE, {
    params: {
      page: 1,
      page_size: 20,
    },
  });

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
