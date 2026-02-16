import { Router } from "express";
import { ArticleController } from "../controllers/article.controller";

const router = Router();

router.get("/", ArticleController.getAll);
router.get("/:id", ArticleController.getById);
router.post("/", ArticleController.create);
router.put("/:id", ArticleController.update);
router.delete("/:id", ArticleController.delete);
router.patch("/:id/status", ArticleController.updateStatus);

export default router;