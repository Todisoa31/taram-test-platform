import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";

const router = Router();

router.get("/", NotificationController.getAll);

export default router;
