import { Box, Card, CardContent, Typography } from "@mui/material";

type Props = {
  total: number;
  draft: number;
  published: number;
  archived: number;
};

export default function StatsCards({ total, draft, published, archived }: Props) {
  const stats = [
    { label: "Total Articles", value: total },
    { label: "Draft", value: draft },
    { label: "Published", value: published },
    { label: "Archived", value: archived },
  ];

  return (
    <Box sx={{ display: "grid", gap: 3, mb: 4, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" } }}>
      {stats.map(stat => (
        <Card key={stat.label} elevation={3} sx={{ borderRadius: 3, p: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary">{stat.label}</Typography>
            <Typography variant="h4" fontWeight={600}>{stat.value}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
