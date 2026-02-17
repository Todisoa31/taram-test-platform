import { Request, Response } from "express";
import { NotificationService } from "../services/notification.service";

export class NotificationController {
  static async getAll(req: Request, res: Response) {
    try {
      const notifications = await NotificationService.getAll();
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  }
}
