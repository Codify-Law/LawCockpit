import axios from "axios";
import StorageService from "@/lib/storage";
// import { useGlobalStore } from "@/store/global";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL_V1 ?? "http://localhost:3000/api";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    const storage = new StorageService();
    const token = storage.get("authorizationToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401: {
          // if (error.response?.data?.error === "UNAUTHORIZED_TYPE") break;
          break;
        }
        case 403: {
          const storage = new StorageService();
          storage.delete("authorizationToken");
          window.location.href = "/signin";
          // break;
          // Handle forbidden
          break;
        }
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
        default:
          // Handle other errors
          break;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
