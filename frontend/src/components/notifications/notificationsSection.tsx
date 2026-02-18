"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { EmailNotification } from "@/src/services/notification.service";

interface Props {
  notifications: EmailNotification[];
}

export default function NotificationsSection({ notifications }: Props) {
  return (
    <Box>
      <Typography variant="h6" mb={2}>Dernières notifications envoyées</Typography>
      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" } }}>
        {notifications
          .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
          .slice(0, 5)
          .map((notif) => (
            <Card key={notif.id} sx={{ borderRadius: 3, p: 2 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  {new Date(notif.sentAt).toLocaleString()}
                </Typography>
                <Typography variant="body1">{notif.subject}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Destinataires: {notif.recipients.join(", ")}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Box>
    </Box>
  );
}
