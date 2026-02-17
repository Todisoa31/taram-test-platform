import express from "express";
import cors from "cors";
import articleRoutes from "./routes/article.routes";
import categoryRoutes from "./routes/category.routes";
import networkRoutes from "./routes/network.routes";
import notificationRoutes from "./routes/notification.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import importRoutes from "./routes/import.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(errorMiddleware);

app.use("/api/articles", articleRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/networks", networkRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/import", importRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API en cours d'exécution" });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
