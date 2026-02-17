import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  static async getAll(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getAll();
      res.json(categories);
    } catch (error: any) {
      res.status(500).json({ message: `Impossible de récupérer les catégories: ${error.message}` });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const category = await CategoryService.create(req.body);
      res.status(201).json(category);
    } catch (error: any) {
      res.status(400).json({ message: `Erreur lors de la création de la catégorie: ${error.message}` });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const category = await CategoryService.update(
        req.params.id as string,
        req.body
      );

      if (!category) {
        return res.status(404).json({ message: "Catégorie non trouvée" });
      }

      res.json(category);
    } catch (error: any) {
      res.status(400).json({ message: `Erreur lors de la mise à jour de la catégorie : ${error.message}` });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const success = await CategoryService.delete(req.params.id as string);

      if (!success) {
        return res.status(404).json({ message: "Catégorie non trouvée" });
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
