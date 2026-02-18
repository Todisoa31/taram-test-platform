// services/categorie.service.ts
import { Categorie } from "../types/categorie";
import { api } from "./api";

export const categorieService = {
  // Récupère toutes les catégories existantes
  async getAll(): Promise<Categorie[]> {
    try {
      const response = await api.get<Categorie[]>("/categories");
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  },

  // Crée une nouvelle catégorie
  async create(data: Omit<Categorie, "id" | "articleCount">): Promise<Categorie> {
    try {
      const response = await api.post<Categorie>("/categories", data);
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  },

  // Met à jour une catégorie existante
  async update(id: string, data: Partial<Omit<Categorie, "id" | "articleCount">>): Promise<Categorie | null> {
    try {
      const response = await api.put<Categorie>(`/categories/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      return null;
    }
  },

  // Supprime une catégorie
  async delete(id: string): Promise<boolean> {
    try {
      const response = await api.delete<boolean>(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
};
