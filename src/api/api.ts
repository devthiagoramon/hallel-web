import { loadTokenAPI } from "@/utils/mainUtils";
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "X-CSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
  },
});

api.interceptors.request.use(
  (config) => {
    const token = loadTokenAPI();
    if (token) {
      config.headers.Authorization = `Bearer ${token.toString()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
