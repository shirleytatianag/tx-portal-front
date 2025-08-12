import {LoginInterface, LoginResponse} from "@/app/(protected-login)/login/login.interface";
import api from "@/services/api";

export const Auth = {
  login: async (payload: LoginInterface): Promise<LoginResponse> => {
    try {
      const { data } = await api.post<LoginResponse>("/auth/login", payload);
      return data;
    } catch (error: any) {
      console.log(error)
      return {
        message: error.response?.data?.message || "Credenciales inválidas",
      };
    }
  },
};