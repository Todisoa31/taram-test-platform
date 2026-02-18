"use client";

import { ReactNode } from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "@/src/components/sideBars/sidebar";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              backgroundColor: "#f5f5f5",
              minHeight: "100vh",
            }}
          >
            {children}
          </Box>
        </Box>
      </body>
    </html>
  );
}
