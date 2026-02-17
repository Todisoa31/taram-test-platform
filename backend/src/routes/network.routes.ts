import { Router } from "express";
import { NetworkController } from "../controllers/network.controller";

const router = Router();

router.get("/", NetworkController.getAll);

export default router;
