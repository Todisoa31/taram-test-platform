import { api } from "./api";

export type NotificationStatus = "sent" | "failed";

export interface EmailNotification {
  id: string;
  articleId: string;
  recipients: string[];
  subject: string;
  sentAt: string;
  status: NotificationStatus;
}

export const notificationService = {
  async sendArticle(articleId: string, title: string): Promise<EmailNotification> {
    try {
      const response = await api.post<EmailNotification>("/notifications/send", {
        articleId,
        title,
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'envoi de notification :", error);
      throw error;
    }
  },

  async getAll(): Promise<EmailNotification[]> {
    try {
      const response = await api.get<EmailNotification[]>("/notifications");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des notifications :", error);
      return [];
    }
  },
};
