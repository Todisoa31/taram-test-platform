"use client";

import { Dialog, DialogTitle, DialogContent, Button, Alert } from "@mui/material";
import { useState } from "react";
import { articleService } from "../../services/article.service";
import axios from "axios";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export default function ImportArticles({ open, onClose, onSuccess }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(null);
    setError(null);

    if (!event.target.files?.[0]) return;

    const file = event.target.files[0];

    try {
      // Vérification extension
      if (!file.name.endsWith(".json")) {
        throw new Error("Veuillez sélectionner un fichier JSON valide.");
      }

      const text = await file.text();
      const data = JSON.parse(text);

      // Validation simple du format attendu
      if (!Array.isArray(data)) {
        throw new Error("Le fichier doit contenir un tableau d'articles.");
      }

      for (const article of data) {
        if (
          !article.title ||
          !article.content ||
          !article.author ||
          !article.category ||
          !article.network
        ) {
          throw new Error("Un ou plusieurs articles ne respectent pas le format requis.");
        }
      }

      const result = await articleService.importJSON(data);

      setMessage(`Import réussi : ${result.imported} articles importés`);
      await onSuccess();

    } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
            setError(err.response?.data?.message ?? "Erreur serveur.");
        } else if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("Erreur inconnue.");
        }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Importer des articles (JSON)</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        
        <Button variant="contained" component="label">
          Choisir fichier JSON
          <input type="file" hidden accept=".json" onChange={handleFile} />
        </Button>

        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

      </DialogContent>
    </Dialog>
  );
}
