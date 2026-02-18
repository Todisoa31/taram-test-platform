"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput
} from "@mui/material";

import { ArticleCreate } from "../../types/article";
import { networkService } from "../../services/network.service";
import { Network } from "@/src/types/netWork";
import { categorieService } from "@/src/services/categorie.service";
import { Categorie } from "@/src/types/categorie";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ArticleCreate) => Promise<void>;
}

export default function AddArticle({ open, onClose, onSubmit }: Props) {
  const [form, setForm] = useState<ArticleCreate>({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    categories: [],
    network: ""
  });

  const [networks, setNetworks] = useState<Network[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [backendErrors, setBackendErrors] = useState<{ [key: string]: string }>({});

  // Charger les réseaux
  useEffect(() => {
    const fetchNetworks = async () => {
      const nets = await networkService.getAll();
      setNetworks(nets);
    };
    fetchNetworks();
  }, []);

  // Charger les catégories
  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await categorieService.getAll();
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  type BackendErrorLike = {
    response?: {
      data?: {
        errors?: { [key: string]: string };
        message?: string;
      };
    };
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(form);
      setBackendErrors({});
      onClose();
    } catch (err: unknown) {
      const error = err as BackendErrorLike;
      if (error.response?.data?.errors) {
        setBackendErrors(error.response.data.errors as { [key: string]: string });
      } else if (error.response?.data?.message) {
        setBackendErrors({ general: error.response.data.message! });
      } else {
        setBackendErrors({ general: "Erreur inconnue" });
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Ajouter un article</DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        {/* Erreur globale backend en haut */}
        {backendErrors.general && (
          <p style={{ color: "red", margin: 0 }}>{backendErrors.general}</p>
        )}

        {/* Titre */}
        <TextField
          label="Titre"
          fullWidth
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          error={!!backendErrors.title}
          helperText={backendErrors.title}
        />

        {/* Contenu */}
        <TextField
          label="Contenu"
          multiline
          rows={4}
          fullWidth
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          error={!!backendErrors.content}
          helperText={backendErrors.content}
        />

        {/* Résumé */}
        <TextField
          label="Résumé"
          fullWidth
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          error={!!backendErrors.excerpt}
          helperText={backendErrors.excerpt}
        />

        {/* Auteur */}
        <TextField
          label="Auteur"
          fullWidth
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          error={!!backendErrors.author}
          helperText={backendErrors.author}
        />

        {/* Catégories multi-select */}
        <FormControl fullWidth error={!!backendErrors.categories}>
          <InputLabel id="categories-label">Catégories</InputLabel>
          <Select
            labelId="categories-label"
            multiple
            value={form.categories}
            onChange={(e) =>
              setForm({ ...form, categories: e.target.value as string[] })
            }
            input={<OutlinedInput label="Catégories" />}
            renderValue={(selected) => {
              const selectedIds = selected as string[];
              return selectedIds
                .map((id) => categories.find((c) => c.id === id)?.name)
                .join(", ");
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                <Checkbox checked={form.categories.includes(cat.id)} />
                <ListItemText primary={cat.name} />
              </MenuItem>
            ))}
          </Select>
          {backendErrors.categories && (
            <p style={{ color: "red", margin: 0 }}>{backendErrors.categories}</p>
          )}
        </FormControl>

        {/* Réseau */}
        <TextField
          label="Réseau"
          select
          fullWidth
          value={form.network}
          onChange={(e) => setForm({ ...form, network: e.target.value })}
          error={!!backendErrors.network}
          helperText={backendErrors.network}
        >
          {networks.map((net) => (
            <MenuItem key={net.id} value={net.name}>
              {net.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
