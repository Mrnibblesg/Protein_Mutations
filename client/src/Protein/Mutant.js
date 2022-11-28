import React, { useEffect, useState } from "react";

import axios from "axios";
import { AppBar, Box, Button, Dialog, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import MolstarViewer from "../MolstarViewer";
import { useNotification } from "../NotificationContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Mutant({ open, mutant, handleClose, index, residue, mode, pdb_id }) {
  const { setNotification } = useNotification();
  // useEffect(() => {
  //   const getMutant = async () => {

  //   };

  //   getMutant();
  // }, [index, residue]);
  // console.log(mutant);
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      TransitionProps={{ unmountOnExit: true }}>
      <AppBar position="relative">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Mutant for {pdb_id}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ my: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Button variant="contained">Download</Button>
        </Box>
        {mutant && <MolstarViewer pdbStr={mutant.pdb_data?.pdb} mutant={mutant} />}
        {/* Maybe having loading thing when mutant is falsy */}
      </Container>
    </Dialog>
  );
}
