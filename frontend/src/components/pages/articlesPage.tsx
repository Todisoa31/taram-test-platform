"use client";

import { useArticles } from "@/src/hooks/articles";
import ArticleTable from "../articles/articleTable";

export default function ArticlesPage() {
  const { articles, loading, error, refetch } = useArticles();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des articles</h1>
      <ArticleTable articles={articles} onRefresh={refetch} />
    </div>
  );
}
