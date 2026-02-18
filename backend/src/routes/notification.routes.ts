import express from "express";
import { NotificationService } from "../services/notification.service";

const router = express.Router();

// Envoyer notification pour un article publié
router.post("/send", async (req, res) => {
  const { articleId, title } = req.body;
  try {
    const notification = await NotificationService.sendArticlePublished(articleId, title);
    res.json(notification);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur envoi notification" });
  }
});

// Récupérer toutes les notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await NotificationService.getAll();
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur récupération notifications" });
  }
});

export default router;
