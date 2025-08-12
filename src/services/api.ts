import axios from "axios";
import {getItem} from "@/services/storage";
import {showToast} from "@/services/alert";

const api = axios.create({
  baseURL: "http://localhost:8009/app",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // @ts-ignore
  if (config.baseURL.includes('auth')) {
    return config;
  }
  const token = getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error)
    if (error.response && error.response.status === 401) {
      showToast("Sesión expirada", "Por favor, inicia sesión nuevamente.",
        2000, "warning")
      console.error("Unauthorized access - redirecting to login");
      // setTimeout(() => {
      window.location.href = "/login";
      // }, 2000);
    }
    return Promise.reject(error);
  }
);

export default api;