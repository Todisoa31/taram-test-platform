"use client";

import { Box, Fade } from "@mui/material";
import ArticleCard from "../common/articleCard";
import { Article } from "../../types/article";

interface Props {
  articles: Article[];
  loadingId: string | null;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
  getStatusColor: (status: string) => "success" | "warning" | "default";
}

export default function ArticlesList({ articles, loadingId, onDelete, onPublish, getStatusColor }: Props) {
  if (articles.length === 0) return null;

  return (
    <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(3, 1fr)" } }}>
      {articles.map(article => (
        <Fade in timeout={400} key={article.id}>
          <ArticleCard
            article={article}
            loadingId={loadingId}
            onDelete={onDelete}
            onPublish={onPublish}
            getStatusColor={getStatusColor}
          />
        </Fade>
      ))}
    </Box>
  );
}
