import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "X-CSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
  },
});

export default api;
