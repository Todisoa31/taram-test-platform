import nodemailer from "nodemailer";
import { DatabaseService } from "./database.service";
import { EmailNotification, NotificationStatus } from "../models/notification.model";
import { randomUUID } from "crypto";

export class NotificationService {
  static async sendArticlePublished(articleId: string, title: string) {
    const db = await DatabaseService.read();

    // Création du transporteur Nodemailer (Mailtrap)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.NOTIFICATION_EMAIL,
        pass: process.env.NOTIFICATION_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NOTIFICATION_EMAIL,
      to: "toudisoua@gmail.com", // destinataire
      subject: `Article publié: ${title}`,
      text: `L'article "${title}" vient d'être publié. ID: ${articleId}`,
    };

    let status: NotificationStatus = "sent";

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email envoyé avec succès !");
    } catch (err) {
      console.error("Erreur envoi email:", err);
      status = "failed";
    }

    // Créer l'objet notification
    const notification: EmailNotification = {
      id: randomUUID(),
      articleId,
      recipients: [mailOptions.to],
      subject: mailOptions.subject,
      sentAt: new Date(),
      status,
    };

    // Sauvegarder la notification dans la DB
    db.notifications.push(notification);
    await DatabaseService.write(db);

    return notification;
  }

  static async getAll(): Promise<EmailNotification[]> {
    const db = await DatabaseService.read();
    return db.notifications;
  }
}
