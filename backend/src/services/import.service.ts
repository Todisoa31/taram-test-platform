import { DatabaseService } from "./database.service";
import { randomUUID } from "crypto";
import { Article } from "../models/article.model";

export class ImportService {
  static async importArticles(data: Partial<Article>[]) {
    const db = await DatabaseService.read();

    const newArticles: Article[] = data.map((item) => ({
      id: randomUUID(),
      title: item.title || "Untitled",
      content: item.content || "",
      excerpt: item.excerpt || "",
      author: item.author || "",
      categories: item.categories ? [item.categories[0]] : [],
      network: item.network || "",
      featured: item.featured || false,
      status: "draft",
      publishedAt: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }) as Article);

    db.articles.push(...newArticles);

    await DatabaseService.write(db);

    return newArticles.length;
  }
}
