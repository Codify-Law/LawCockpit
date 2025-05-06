import axios from "@/lib/axios";
import { DemoRequest } from "@/types/demo-request";

const RESOURCE = "/users/requests-demo";

export const fetchDemoRequestsList = async (
  page: number = 1,
  pageSize: number = 20
): Promise<{ data: DemoRequest[]; totalPages: number; totalItems: number }> => {
  const response = await axios.get<{ data: DemoRequest[] }>(RESOURCE, {
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
