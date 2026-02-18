"use client";

import { useEffect, useState } from "react";
import { articleService } from "../services/article.service";
import { Article } from "../types/article";

export function useDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await articleService.getAll();
        setArticles(data);
      } catch {
        setError("Erreur lors du chargement du dashboard");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const total = articles.length;
  const draft = articles.filter(a => a.status === "draft").length;
  const published = articles.filter(a => a.status === "published").length;
  const archived = articles.filter(a => a.status === "archived").length;

  const lastPublished = articles
    .filter(a => a.status === "published")
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  return {
    loading,
    error,
    total,
    draft,
    published,
    archived,
    lastPublished,
  };
}
