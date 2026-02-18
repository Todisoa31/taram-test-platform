"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Article } from "../../types/article";
import { articleService } from "../../services/article.service";
import StatsCards from "../common/statsCards";
import { notificationService, EmailNotification } from "@/src/services/notification.service";
import NetworkChart from "../common/networkChart";
import NotificationsSection from "../notifications/notificationsSection";
import ArticlesList from "../articles/articlesList";

export default function Dashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [notifications, setNotifications] = useState<EmailNotification[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Charger les articles et notifications
  useEffect(() => {
    const loadData = async () => {
      const articlesData = await articleService.getAll();
      setArticles(articlesData);

      try {
        const notificationsData = await notificationService.getAll();
        setNotifications(notificationsData);
      } catch (err) {
        console.error("Erreur récupération notifications:", err);
      }
    };

    loadData();
  }, []);

  // Statistiques
  const total = articles.length;
  const draft = articles.filter(a => a.status === "draft").length;
  const published = articles.filter(a => a.status === "published").length;
  const archived = articles.filter(a => a.status === "archived").length;

  // Gestion des actions articles
  const handleDelete = async (id: string) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      setLoadingId(id);
      await articleService.delete(id);
      const data = await articleService.getAll();
      setArticles(data);
    } finally {
      setLoadingId(null);
    }
  };

  const handlePublish = async (id: string) => {
    try {
      setLoadingId(id);
      await articleService.updateStatus(id, "published");
      const data = await articleService.getAll();
      setArticles(data);
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "success";
      case "draft":
        return "warning";
      case "archived":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={4}>
        Dashboard
      </Typography>

      {/* Statistiques */}
      <StatsCards total={total} draft={draft} published={published} archived={archived} />

      {/* Graphique Répartition par réseau */}
      <NetworkChart
        data={Object.entries(
          articles.reduce((acc, a) => {
            acc[a.network] = (acc[a.network] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        ).map(([name, value]) => ({ name, value }))}
      />


      {/* Liste des articles publiés */}
      <ArticlesList
        articles={articles.filter(a => a.status === "published")}
        loadingId={loadingId}
        onDelete={handleDelete}
        onPublish={handlePublish}
        getStatusColor={getStatusColor}
      />

      {/* Notifications récentes */}
      <NotificationsSection notifications={notifications} />
    </Box>
  );
}
