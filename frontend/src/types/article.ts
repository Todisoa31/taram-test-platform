export type ArticleStatus = "draft" | "published" | "archived";

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  categories: string[];
  network: string;
  status: ArticleStatus;
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
