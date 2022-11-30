import React, { useEffect, useState } from "react";

import axios from "axios";
import FileDownload from "js-file-download";
import { AppBar, Box, Button, Dialog, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import MolstarViewer from "../MolstarViewer";
import { useNotification } from "../NotificationContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Mutant({ open, mutant, handleClose, mode, type }) {
  const { setNotification } = useNotification();
  // useEffect(() => {
  //   const getMutant = async () => {

  //   };

  //   getMutant();
  // }, [index, residue]);
  // console.log(mutant);
  const download = () => {
    let filename = mutant.pdb_id + mutant.mode;
    if (type === "single") {
      filename += mutant.index + (mutant.residue ?? "");
    } else if (type === "pairwise") {
      filename +=
        mutant.index[0] +
        (mutant.residue?.[0] ?? "") +
        mutant.index[1] +
        (mutant.residue?.[1] ?? "");
    }
    filename += ".json";
    FileDownload(JSON.stringify(mutant), filename);
  };
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
            Mutant for {mutant.pdb_id}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ my: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Button onClick={download} variant="contained">
            Download
          </Button>
        </Box>
        {mutant && <MolstarViewer pdbStr={mutant.pdb_data?.pdb} mutant={mutant} />}
        {/* Maybe having loading thing when mutant is falsy */}
      </Container>
    </Dialog>
  );
}
