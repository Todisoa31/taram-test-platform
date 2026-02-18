import { api } from "./api";
import { Article } from "../types/article";

export const articleService = {
  async getAll(): Promise<Article[]> {
    const res = await api.get("/articles");
    // The backend returns an object { data: Article[], total, page, ... }
    // Normalize to return the articles array so callers can use `articles.map(...)`.
    return res.data?.data ?? res.data;
  },

  async delete(id: string) {
    return api.delete(`/articles/${id}`);
  },

  async updateStatus(id: string, status: string) {
    return api.patch(`/articles/${id}/status`, { status });
  },
};