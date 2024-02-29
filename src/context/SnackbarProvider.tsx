import React, { createContext, useCallback, useState } from "react";
import Alerts from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { Alert } from "../types";

type SnackbarContextProps = (alert: Alert) => void;

export const SnackbarContext = createContext<SnackbarContextProps>(() => {});

interface SnackbarProviderProps {
  children: React.JSX.Element;
}

export function SnackbarProvider({
  children,
}: SnackbarProviderProps): React.JSX.Element {
  const [alert, setAlert] = useState<Alert>();

  const createAlert = useCallback(({ message, severity }: Alert) => {
    setAlert({ severity, message });
  }, []);

  const handleExited = () => setAlert(undefined);

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    reason !== "clickaway" && handleExited();
  };

  return (
    <SnackbarContext.Provider value={createAlert}>
      {children}
      {alert && (
        <Snackbar
          open={!!alert}
          autoHideDuration={6000}
          onClose={handleClose}
          TransitionProps={{ onExited: handleExited }}
        >
          <Alerts
            onClose={handleClose}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alerts>
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
}
