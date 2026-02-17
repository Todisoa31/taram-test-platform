import { DatabaseService } from "./database.service";
import { EmailNotification, NotificationStatus } from "../models/notification.model";
import { randomUUID } from "crypto";

export class NotificationService {
  static async sendArticlePublished(articleId: string, title: string) {
    const db = await DatabaseService.read();

    // Simulation envoi email
    let status: NotificationStatus = "sent";

    const notification: EmailNotification = {
      id: randomUUID(),
      articleId,
      recipients: ["toudisoua@gmail.com"],
      subject: `Article publié: ${title}`,
      sentAt: new Date(),
      status,
    };

    db.notifications.push(notification);

    await DatabaseService.write(db);
    console.log("NOTIFICATION CRÉÉE");

    return notification;
  }

  static async getAll() {
    const db = await DatabaseService.read();
    return db.notifications;
  }
}
