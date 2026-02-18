"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { notificationService, EmailNotification } from "@/src/services/notification.service";

export default function NotificationList() {
  const [notifications, setNotifications] = useState<EmailNotification[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await notificationService.getAll();
      setNotifications(data);
    } catch (err) {
      console.error("Erreur récupération notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Notifications ({notifications.length})</Typography>
        <Button variant="contained" onClick={fetchNotifications}>
          Rafraîchir
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Article ID</TableCell>
                <TableCell>Sujet</TableCell>
                <TableCell>Destinataires</TableCell>
                <TableCell>Date d’envoi</TableCell>
                <TableCell>Statut</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications.map((notif) => (
                <TableRow key={notif.id}>
                  <TableCell>{notif.id}</TableCell>
                  <TableCell>{notif.articleId}</TableCell>
                  <TableCell>{notif.subject}</TableCell>
                  <TableCell>{notif.recipients.join(", ")}</TableCell>
                  <TableCell>{new Date(notif.sentAt).toLocaleString()}</TableCell>
                  <TableCell>{notif.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
