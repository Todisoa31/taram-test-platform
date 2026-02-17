import { Request, Response } from "express";
import { NetworkService } from "../services/network.service";

export class NetworkController {
  static async getAll(req: Request, res: Response) {
    try {
      const networks = await NetworkService.getAll();
      res.json(networks);
    } catch {
      res.status(500).json({ message: "Failed to fetch networks" });
    }
  }
}