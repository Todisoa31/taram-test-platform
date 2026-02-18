import { api } from "./api";
import { Article, ArticleCreate, ArticleImport, ArticleStatus } from "../types/article";
import { AxiosResponse } from "axios";

interface PaginatedResponse<T> {
  data: T;
  total?: number;
  page?: number;
  limit?: number;
}

// type ArticleStatus = "draft" | "published" | "archived";

class ArticleService {
  private normalizeResponse<T>(
    response: AxiosResponse<PaginatedResponse<T> | T>
  ): T {
    return (response.data as PaginatedResponse<T>)?.data ?? (response.data as T);
  }

  async getAll(): Promise<Article[]> {
    try {
      const response = await api.get<
        PaginatedResponse<Article[]> | Article[]
      >("/articles");

      return this.normalizeResponse<Article[]>(response);
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/articles/${id}`);
    } catch (error) {
      console.error(`Error deleting article ${id}:`, error);
      throw error;
    }
  }

  async updateStatus(
    id: string,
    status: ArticleStatus
  ): Promise<Article> {
    try {
      const response = await api.patch<Article>(
        `/articles/${id}/status`,
        { status }
      );

      return response.data;
    } catch (error) {
      console.error(`Error updating status for article ${id}:`, error);
      throw error;
    }
  }

 async create(
    data: ArticleCreate
  ): Promise<Article> {
    try {
      const response = await api.post<Article>(
        "/articles",
        data
      );

      return response.data;
    } catch (error: unknown) {
      console.error("Error creating article:", error);
      throw error;
    }
  }


  async importJSON(data: ArticleImport[]): Promise<{ imported: number }> {
    try {
      const response = await api.post("/articles/import", data, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      return response.data;
    } catch (error) {
      console.error("Error importing JSON:", error);
      throw error;
    }
  }
}

export const articleService = new ArticleService();