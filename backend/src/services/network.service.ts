import { DatabaseService } from "./database.service";
import { Network } from "../models/network.model";

export class NetworkService {
  static async getAll(): Promise<Network[]> {
    const db = await DatabaseService.read();
    return db.networks;
  }
}