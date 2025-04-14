import axios from "@/lib/axios";
import { Document } from "@/types/document";

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

export const fetchDocument = async (id: string): Promise<Document> => {
  const response = await axios.get<Document>(`${RESOURCE}${id}`);

  return response.data;
};
