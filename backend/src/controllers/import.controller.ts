import { Request, Response } from "express";
import { ImportService } from "../services/import.service";

export class ImportController {
  static async importArticles(req: Request, res: Response) {
    const count = await ImportService.importArticles(req.body);
    res.json({
      message: `${count} Articles importés avec succès`,
    });
  }
}
