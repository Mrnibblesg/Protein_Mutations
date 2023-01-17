import React, { createContext, useContext, useEffect, useState } from "react";

import { IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const NotificationContext = createContext(null);
export const useNotification = () => {
  return useContext(NotificationContext);
};

export function Notification() {
  const { notification, setNotification } = useNotification();
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState();
  const handleClose = () => {
    setNotification(null);
  };

  // This will display the snackbar and reset the timer whenever the message prop
  // changes to a non-falsy value
  useEffect(() => {
    setOpen(Boolean(notification));
    clearTimeout(timer);
    const timeout = setTimeout(() => {
      setOpen(false);
      setNotification(null);
    }, 4000);
    setTimer(timeout);
    return () => {
      clearTimeout(timeout);
      setTimer();
    };
  }, [notification]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      message={notification}
      ClickAwayListenerProps={{ mouseEvent: false, touchEvent: false }}
      action={
        <IconButton size="small" color="secondary" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
}
