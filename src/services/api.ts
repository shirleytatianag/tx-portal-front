import axios from "axios";
import {getItem, removeAll} from "@/services/storage";
import {showToast} from "@/services/alert";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("No se ha definido NEXT_PUBLIC_API_URL en el archivo de entorno");
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (config.baseURL && config.baseURL.includes('auth')) {
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
    if (error.response && error.response.status === 401) {
      showToast("Sesión expirada", "Por favor, inicia sesión nuevamente.",
        2000, "warning")
      removeAll()
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;