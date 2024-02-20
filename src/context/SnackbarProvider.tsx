import React, { createContext, useCallback, useEffect, useState } from "react";
import Alerts from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { Alert, IAlerts } from "../types"


type SnackbarContextProps = (alert: Alert) => void;

export const SnackbarContext = createContext<SnackbarContextProps>(() => {});

interface SnackbarProviderProps {
  children: React.JSX.Element;
}

export function SnackbarProvider({
  children,
}: SnackbarProviderProps): React.JSX.Element {
  const [alerts, setAlerts] = useState<readonly IAlerts[]>([]);
  const [open, setOpen] = React.useState(false);
  const [alert, setAlert] = React.useState<IAlerts | undefined>(undefined);

  const createAlert = useCallback(({ message, severity }: Alert) => {
    setAlerts((prev) => [
      ...prev,
      { severity, message, key: new Date().getTime() },
    ]);
  }, []);

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleExited = () => {
    setAlert(undefined);
  };

  useEffect(() => {
    if (alerts.length && !alert) {
      setAlert({ ...alerts[0] });
      setAlerts((prev) => prev.slice(1));
      setOpen(true);
    } else if (alerts.length && alert && open) {
      setOpen(false);
    }
  }, [alerts, alert, open]);

  return (
    <SnackbarContext.Provider value={createAlert}>
      {children}
      <Snackbar
        key={alert ? alert.key : undefined}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionProps={{ onExited: handleExited }}
      >
        <Alerts
          onClose={handleClose}
          severity={alert?.severity}
          sx={{ width: "100%" }}
        >
          {alert?.message}
        </Alerts>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
