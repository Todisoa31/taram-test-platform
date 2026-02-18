import { Network } from "../types/netWork";
import { api } from "./api";

// export interface Network {
//   id: string;
//   name: string;
//   description?: string;
// }

export const networkService = { 
  async getAll(): Promise<Network[]> {
    try {
      const response = await api.get<Network[]>("/networks");
      return response.data;
    } catch (error) {
      console.error("L'erreur de récupération des réseaux :", error);
      return [];
    }
  }
};
