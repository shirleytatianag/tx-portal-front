/**
 * @jest-environment node
 */


import api from "@/services/api";
import {Supplier, RechargeRequest, RechargeResponse, Page} from "@/app/(protected)/recharge/recharge.interface";
import {Recharge} from "@/services/recharge";

jest.mock("@/services/api");


describe("Recharge Service", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getSuppliers", () => {
    it("debe devolver la lista de proveedores", async () => {
      const mockSuppliers: Supplier[] = [
        {id: "1", name: "Claro"},
        {id: "2", name: "Movistar"}
      ];

      (api.get as jest.Mock).mockResolvedValue({data: mockSuppliers});

      const result = await Recharge.getSuppliers();

      expect(api.get).toHaveBeenCalledWith("/recharge/suppliers");
      expect(result).toEqual(mockSuppliers);
    });

    it("debe lanzar un error si falla la llamada", async () => {
      const error = new Error("Network error");
      (api.get as jest.Mock).mockRejectedValue(error);

      await expect(Recharge.getSuppliers()).rejects.toThrow("Network error");
    });
  });

  describe("recharge", () => {
    it("debe enviar la recarga y devolver la respuesta", async () => {
      const payload: RechargeRequest = {
        phone_number: "3001234567",
        operator_id: "1",
        operator_name: "Claro",
        amount: 20000
      };

      const mockResponse: RechargeResponse = {
        recharge_id: "123",
        phone_number: "3001234567",
        operator_name: "Claro",
        amount: 20000,
        status: "SUCCESS",
        puntored_transaction_id: "abc",
        ticket: "ticket123",
        created_at: "2025-08-15"
      };

      (api.post as jest.Mock).mockResolvedValue({data: mockResponse});

      const result = await Recharge.recharge(payload);

      expect(api.post).toHaveBeenCalledWith("/recharge/", payload);
      expect(result).toEqual(mockResponse);
    });

    it("debe lanzar un error si falla la recarga", async () => {
      const payload: RechargeRequest = {
        phone_number: "3001234567",
        operator_id: "1",
        operator_name: "Claro",
        amount: 20000
      };
      const error = new Error("Server error");
      (api.post as jest.Mock).mockRejectedValue(error);

      await expect(Recharge.recharge(payload)).rejects.toThrow("Server error");
    });
  });

  describe("getRecharges", () => {
    it("debe devolver una página de recargas", async () => {
      const pageNumber = 1;
      const mockPage: Page<RechargeResponse> = {
        content: [
          {
            recharge_id: "123",
            phone_number: "3001234567",
            operator_name: "Claro",
            amount: 20000,
            status: "SUCCESS",
            puntored_transaction_id: "abc",
            ticket: "ticket123",
            created_at: "2025-08-15"
          }
        ],
        totalPages: 5,
        totalElements: 50,
        size: 10,
        number: 1,
        pageable: {
          sort: {
            empty: false,
            sorted: false,
            unsorted: false
          },
          offset: 0,
          pageSize: 0,
          pageNumber: 0,
          paged: false,
          unpaged: false
        },
        last: false,
        sort: {
          empty: false,
          sorted: false,
          unsorted: false
        },
        first: false,
        numberOfElements: 0,
        empty: false
      };

      (api.get as jest.Mock).mockResolvedValue({data: mockPage});

      const result = await Recharge.getRecharges(pageNumber);

      expect(api.get).toHaveBeenCalledWith("/recharge/", {params: {pageNumber}});
      expect(result).toEqual(mockPage);
    });

    it("debe lanzar un error si falla la consulta de recargas", async () => {
      const error = new Error("Server error");
      (api.get as jest.Mock).mockRejectedValue(error);

      await expect(Recharge.getRecharges(1)).rejects.toThrow("Server error");
    });
  });
});
