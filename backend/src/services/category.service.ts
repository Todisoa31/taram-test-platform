import { v4 as uuidv4 } from "uuid";
import { DatabaseService } from "./database.service";
import { Category } from "../models/category.model";
import { Article } from "../models/article.model";

export class CategoryService {
  static async getAll() {
    const db = await DatabaseService.read();

    return db.categories.map((category: Category) => {
      const articleCount = db.articles.filter((article: Article) =>
        article.categories.includes(category.id)
      ).length;

      return {
        ...category,
        articleCount
      };
    });
  }

  static async create(data: Omit<Category, "id">) {
    const db = await DatabaseService.read();

    const newCategory: Category = {
      id: uuidv4(),
      ...data
    };

    db.categories.push(newCategory);
    await DatabaseService.write(db);

    return newCategory;
  }

  static async update(id: string, data: Partial<Category>) {
    const db = await DatabaseService.read();

    const index = db.categories.findIndex((c: Category) => c.id === id);
    if (index === -1) return null;

    db.categories[index] = {
      ...db.categories[index],
      ...data
    };

    await DatabaseService.write(db);

    return db.categories[index];
  }

  static async delete(id: string) {
    const db = await DatabaseService.read();

    const isUsed = db.articles.some((article: Article) =>
      article.categories.includes(id)
    );

    if (isUsed) {
      throw new Error("Category is used by at least one article");
    }

    const index = db.categories.findIndex((c: Category) => c.id === id);
    if (index === -1) return false;

    db.categories.splice(index, 1);
    await DatabaseService.write(db);

    return true;
  }
}