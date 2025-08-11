import axios from "axios";
import {getItem} from "@/services/storage";

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

export default api;