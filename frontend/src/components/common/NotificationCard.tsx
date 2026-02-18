import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  title: string;
  date: string;
}

export default function NotificationCard({ title, date }: Props) {
  return (
    <Card sx={{ borderRadius: 3, p: 2 }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">{date}</Typography>
        <Typography variant="body1">{title}</Typography>
      </CardContent>
    </Card>
  );
}