/**
 * @jest-environment node
 */
import { Auth } from "@/services/auth";
import api from "@/services/api";
import { LoginInterface, LoginResponse } from "@/app/(protected-login)/login/login.interface";

jest.mock("@/services/api");

describe("Auth Service", () => {
  beforeAll(() => {
    process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000";
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("debe retornar datos de login correctamente", async () => {
      const payload: LoginInterface = {
        username: "usuario",
        user_password: "123456",
      };

      const mockResponse: LoginResponse = {
        token: "token123",
      };

      (api.post as jest.Mock).mockResolvedValue({ data: mockResponse });

      const result = await Auth.login(payload);

      expect(api.post).toHaveBeenCalledWith("/auth/login", payload);
      expect(result).toEqual(mockResponse);
    });

    it("debe retornar mensaje de error cuando falla la llamada", async () => {
      const payload: LoginInterface = {
        username: "usuario",
        user_password: "wrongpass",
      };

      const mockError = {
        response: {
          data: {
            message: "Usuario o contraseña incorrectos",
          },
        },
      };

      (api.post as jest.Mock).mockRejectedValue(mockError);

      const result = await Auth.login(payload);

      expect(api.post).toHaveBeenCalledWith("/auth/login", payload);
      expect(result).toEqual({ message: "Usuario o contraseña incorrectos" });
    });

    it("debe retornar mensaje por defecto si error no tiene respuesta", async () => {
      const payload: LoginInterface = {
        username: "usuario",
        user_password: "wrongpass",
      };

      (api.post as jest.Mock).mockRejectedValue(new Error("Network error"));

      const result = await Auth.login(payload);

      expect(api.post).toHaveBeenCalledWith("/auth/login", payload);
      expect(result).toEqual({ message: "Credenciales inválidas" });
    });
  });
});
