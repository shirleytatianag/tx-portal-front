import {Error, Page, RechargeRequest, RechargeResponse, Supplier} from "@/app/(protected)/recharge/recharge.interface";
import api from "@/services/api";

export const Recharge = {
  getSuppliers: async (): Promise<Supplier[]> => {
    try {
      const {data} = await api.get<Supplier[]>("/recharge/suppliers");
      return data;
    } catch (error: any) {
      console.log(error)
      throw error;
    }
  },

  recharge: async (payload: RechargeRequest): Promise<RechargeResponse | Error> => {
    try {
      const {data} = await api.post<RechargeResponse>("/recharge/", payload);
      return data;
    } catch (error: any) {
      throw error;
    }
  },

  getRecharges: async (pageNumber: number): Promise<Page<RechargeResponse>> => {
   try {
     const {data} = await api.get<Page<RechargeResponse>>("/recharge/",{
       params: {
         pageNumber: pageNumber
       }
     });
     return data;
   } catch (error: any) {
      console.log(error);
      throw error;
   }
  }
}