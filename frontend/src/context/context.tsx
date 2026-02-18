"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

interface ContextProps {
  showMessage: (msg: string, type?: "success" | "error") => void;
}

const AppContext = createContext<ContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const showMessage = (msg: string, type: "success" | "error" = "success") => {
    setMessage(msg);
    setSeverity(type);
  };

  return (
    <AppContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={() => setMessage(null)}
      >
        <Alert severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
