import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(5, "Le titre doit comporter au moins 5 caractères."),
  content: z.string().min(50, "Le contenu doit comporter au moins 50 caractères."),
  excerpt: z.string().min(5, "L'extrait doit comporter au moins 5 caractères."),
  author: z.string().min(2, "L'auteur est requis."),
  categories: z.array(z.string()).min(1, "Au moins une catégorie est requise."),
  network: z.string().min(1, "Le réseau est requis."),
  featured: z.boolean().optional()
});

export const updateStatusSchema = z.object({
  status: z.enum(["draft", "published", "archived"])
});
