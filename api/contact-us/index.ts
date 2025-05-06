import axios from "@/lib/axios";
import { ContactUs } from "@/types/contact-us";

const RESOURCE = "/users/contact-requests";

export const fetchContactUsList = async (
  page: number = 1,
  pageSize: number = 20
): Promise<{ data: ContactUs[]; totalPages: number; totalItems: number }> => {
  const response = await axios.get<{ data: ContactUs[] }>(RESOURCE, {
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

export const fetchContactUs = async (requestId: string): Promise<ContactUs> => {
  const response = await axios.get<ContactUs>(`/users/contact-request/${requestId}`);

  return response.data;
};
