"use client";

import React, { forwardRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  CardActions
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishIcon from "@mui/icons-material/Send";
import { Article } from "../../types/article";

interface Props {
  article: Article;
  loadingId: string | null;
  onDelete: (id: string) => void;
  onPublish: (id: string) => void;
  getStatusColor: (status: string) => "success" | "warning" | "default";
}

const ArticleCard = forwardRef<HTMLDivElement, Props>(
  ({ article, loadingId, onDelete, onPublish, getStatusColor }, ref) => {
    return (
      <Card
        ref={ref}
        sx={{
          borderRadius: 4,
          transition: "all 0.3s ease",
          "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Typography variant="h6" fontWeight={600}>
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Réseau : {article.network}
          </Typography>
          <Chip
            label={article.status}
            color={getStatusColor(article.status)}
            size="small"
            sx={{ mt: 1 }}
          />
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
          {article.status !== "published" && (
            <Tooltip title="Publier">
              <span>
                <IconButton
                  color="primary"
                  onClick={() => onPublish(article.id)}
                  disabled={loadingId === article.id}
                >
                  <PublishIcon />
                </IconButton>
              </span>
            </Tooltip>
          )}
          <Tooltip title="Supprimer">
            <span>
              <IconButton
                color="error"
                onClick={() => onDelete(article.id)}
                disabled={loadingId === article.id}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        </CardActions>
      </Card>
    );
  }
);

ArticleCard.displayName = "ArticleCard";

export default ArticleCard;
