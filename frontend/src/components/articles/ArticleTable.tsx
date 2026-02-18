"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UploadIcon from "@mui/icons-material/Upload";

import { Article, ArticleCreate } from "../../types/article";
import { articleService } from "../../services/article.service";
import ArticlesList from "./articlesList";
import ArticleForm from "./addArticle";
import ImportArticles from "./importArticle";

interface Props {
  articles: Article[];
  onRefresh: () => Promise<void>;
}

export default function ArticleBoard({ articles, onRefresh }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleDelete = async (id: string) => {
    try {
      setLoadingId(id);
      await articleService.delete(id);
      await onRefresh();
      showSnackbar("Article supprimé", "success");
    } catch {
      showSnackbar("Erreur suppression", "error");
    } finally {
      setLoadingId(null);
    }
  };

  const handlePublish = async (id: string) => {
    try {
      setLoadingId(id);
      await articleService.updateStatus(id, "published");
      await onRefresh();
      showSnackbar("Article publié", "success");
    } catch {
      showSnackbar("Erreur publication", "error");
    } finally {
      setLoadingId(null);
    }
  };

  const handleCreate = async (data: ArticleCreate) => {
    try {
      await articleService.create(data);
      await onRefresh();
      showSnackbar("Article créé", "success");
    } catch {
      showSnackbar("Erreur création", "error");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "success";
      case "draft":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Articles ({articles.length})
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenCreate(true)}
          >
            Ajouter
          </Button>

          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            onClick={() => setOpenImport(true)}
          >
            Importer
          </Button>
        </Box>
      </Box>

      <ArticlesList
        articles={articles}
        loadingId={loadingId}
        onDelete={handleDelete}
        onPublish={handlePublish}
        getStatusColor={getStatusColor}
      />

      {/* Ajout */}
      <ArticleForm
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSubmit={handleCreate}
      />

      <ImportArticles
        open={openImport}
        onClose={() => setOpenImport(false)}
        onSuccess={onRefresh}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
