"use client";

import { Card, CardContent, Typography, Grid } from "@mui/material";

type Props = {
  total: number;
  draft: number;
  published: number;
  archived: number;
};

export default function StatsCards({
  total,
  draft,
  published,
  archived
}: Props) {

  const stats = [
    { label: "Total Articles", value: total },
    { label: "Draft", value: draft },
    { label: "Published", value: published },
    { label: "Archived", value: archived },
  ];

  return (
    <Grid container spacing={3} mb={4}>
        {stats.map((stat) => (
            <Grid
            key={stat.label}
            size={{ xs: 12, sm: 6, md: 3 }}
            >
            <Card elevation={3}>
                <CardContent>
                <Typography variant="h6">{stat.label}</Typography>
                <Typography variant="h4">{stat.value}</Typography>
                </CardContent>
            </Card>
            </Grid>
        ))}
    </Grid>
  );
}
