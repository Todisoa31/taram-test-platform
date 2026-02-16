import { v4 as uuidv4 } from "uuid";
import { Article, ArticleStatus } from "../models/article.model.js";
import { DatabaseService } from "./database.service.js";

interface GetArticlesParams {
  status?: ArticleStatus;
  network?: string;
  category?: string[];
  featured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export class ArticleService {
  static async getAll(params: GetArticlesParams) {
    const db = await DatabaseService.read();
    let articles: Article[] = db.articles;

    // Filtres
    if (params.status) {
      articles = articles.filter(a => a.status === params.status);
    }

    if (params.network) {
      articles = articles.filter(a => a.network === params.network);
    }

    if (params.category && params.category.length > 0) {
      articles = articles.filter(a =>
        params.category!.some(cat => a.categories.includes(cat))
      );
    }

    if (params.featured !== undefined) {
      articles = articles.filter(a => a.featured === params.featured);
    }

    if (params.search) {
      const search = params.search.toLowerCase();
      articles = articles.filter(
        a =>
          a.title.toLowerCase().includes(search) ||
          a.content.toLowerCase().includes(search)
      );
    }

    // Pagination
    const page = params.page || 1;
    const limit = params.limit || 20;

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginated = articles.slice(start, end);

    return {
      data: paginated,
      total: articles.length,
      page,
      totalPages: Math.ceil(articles.length / limit)
    };
  }

  static async getById(id: string) {
    const db = await DatabaseService.read();
    return db.articles.find((a: Article) => a.id === id);
  }

  static async create(data: Partial<Article>) {
    const db = await DatabaseService.read();

    const newArticle: Article = {
      id: uuidv4(),
      title: data.title!,
      content: data.content!,
      excerpt: data.excerpt!,
      author: data.author!,
      categories: data.categories!,
      network: data.network!,
      status: "draft",
      featured: false,
      publishedAt: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    db.articles.push(newArticle);

    await DatabaseService.write(db);

    return newArticle;
  }

  static async update(id: string, data: Partial<Article>) {
    const db = await DatabaseService.read();

    const index = db.articles.findIndex((a: Article) => a.id === id);
    if (index === -1) return null;

    db.articles[index] = {
      ...db.articles[index],
      ...data,
      updatedAt: new Date()
    };

    await DatabaseService.write(db);

    return db.articles[index];
  }

  static async delete(id: string) {
    const db = await DatabaseService.read();

    const index = db.articles.findIndex((a: Article) => a.id === id);
    if (index === -1) return false;

    db.articles.splice(index, 1);

    await DatabaseService.write(db);

    return true;
  }

  static async updateStatus(id: string, status: ArticleStatus) {
    const db = await DatabaseService.read();

    const article = db.articles.find((a: Article) => a.id === id);
    if (!article) return null;

    article.status = status;
    if (status === "published") {
      article.publishedAt = new Date();
    } else {
      article.publishedAt = null;
    }

    await DatabaseService.write(db);

    return article;
  }
}