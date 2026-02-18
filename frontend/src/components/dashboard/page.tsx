"use client";

import { Container, Typography, CircularProgress } from "@mui/material";
import StatsCards from "./statsCards";
import { Dashboard } from "../../hooks/dashboard";

export default function DashboardPage() {
  const {
    loading,
    error,
    total,
    draft,
    published,
    archived,
  } = Dashboard();

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <StatsCards
        total={total}
        draft={draft}
        published={published}
        archived={archived}
      />
    </Container>
  );
}
