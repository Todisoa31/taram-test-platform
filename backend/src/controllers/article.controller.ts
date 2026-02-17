import { NextFunction, Request, Response } from "express";
import { ArticleService } from "../services/article.service";
import { ArticleStatus } from "../models/article.model";
import { createArticleSchema, updateStatusSchema } from "../utils/article.validation";
import { NotificationService } from "../services/notification.service";


export class ArticleController {
  static async getAll(req: Request, res: Response) {
    try {
      const {
        status,
        network,
        category,
        featured,
        search,
        page,
        limit
      } = req.query;

      const result = await ArticleService.getAll({
        status: status as ArticleStatus,
        network: network as string,
        category: category
          ? (category as string).split(",")
          : undefined,
        featured:
          featured !== undefined
            ? featured === "true"
            : undefined,
        search: search as string,
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 20
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Impossible de récupérer les articles" });
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const article = await ArticleService.getById(req.params.id as string);

      if (!article) {
        return res.status(404).json({ message: "Article non trouvé" });
      }

      res.json(article);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération de l'article" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const validatedData = createArticleSchema.parse(req.body);

      const article = await ArticleService.create(validatedData);

      res.status(201).json(article);
    } catch (error: any) {
      return res.status(400).json({
        message: "Erreur de validation",
        errors: error.errors
      });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const article = await ArticleService.update(req.params.id as string
, req.body);

      if (!article) {
        return res.status(404).json({ message: "Article non trouvé" });
      }

      res.json(article);
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la mise à jour de l'article" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const success = await ArticleService.delete(req.params.id as string
);

      if (!success) {
        return res.status(404).json({ message: "Article non trouvé" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression de l'article" });
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const { status } = updateStatusSchema.parse(req.body);

      const article = await ArticleService.updateStatus(
        req.params.id as string,
        status
      );

      if (!article) {
        return res.status(404).json({ message: "Article non trouvé" });
      }

      if (status === "published") {
        await NotificationService.sendArticlePublished(
          article.id,
          article.title
        );
      }

      res.json(article);
    } catch (error: any) {
      return res.status(400).json({
        message: "Erreur de validation",
        errors: error.errors
      });
    }
  }
}