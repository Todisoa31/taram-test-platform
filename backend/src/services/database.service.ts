import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/data/db.json");

export class DatabaseService {
  static async read() {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  }

  static async write(data: any) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }
}
