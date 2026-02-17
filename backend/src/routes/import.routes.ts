import { Router } from "express";
import { ImportController } from "../controllers/import.controller";

const router = Router();

router.post("/articles", ImportController.importArticles);

export default router;