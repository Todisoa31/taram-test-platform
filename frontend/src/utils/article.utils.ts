import { Article } from "../types/article";

export function computeStats(articles: Article[]) {
  return {
    total: articles.length,
    draft: articles.filter(a => a.status === "draft").length,
    published: articles.filter(a => a.status === "published").length,
    archived: articles.filter(a => a.status === "archived").length,
  };
}

export function computeNetworkData(articles: Article[]) {
  const stats: Record<string, number> = {};

  articles.forEach(a => {
    stats[a.network] = (stats[a.network] || 0) + 1;
  });

  return Object.entries(stats).map(([name, value]) => ({
    name,
    value,
  }));
}

export function getLastPublished(articles: Article[]) {
  return articles
    .filter(a => a.status === "published")
    .sort((a, b) =>
      new Date(b.publishedAt || "").getTime() -
      new Date(a.publishedAt || "").getTime()
    )
    .slice(0, 5);
}
