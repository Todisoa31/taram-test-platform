import express from "express";
import cors from "cors";
import articleRoutes from "./routes/article.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/articles", articleRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API running 🚀" });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
