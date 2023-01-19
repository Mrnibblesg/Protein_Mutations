import React, { useEffect, useState } from "react";

import FileDownload from "js-file-download";
import { AppBar, Box, Button, Dialog, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import MolstarViewer from "../MolstarViewer";
import { findResidue } from "../common/residues";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Mutant({ mutant, handleClose, mode, type }) {
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

  const title =
    type === "single"
      ? mode === "insert"
        ? `Insert ${findResidue(mutant.residue).longest} at Position ${mutant.index}`
        : `Delete Residue from Position ${mutant.index}`
      : mode === "insert"
      ? `Insert ${findResidue(mutant.residue[0]).longest} at Position ${mutant.index[0]}, 
      ${findResidue(mutant.residue[1]).longest} at Position ${mutant.index[1]}`
      : `Delete Residues from Positions ${mutant.index[0]} and ${mutant.index[1]}`;

  return (
    <Dialog
      fullScreen
      open
      onClose={handleClose}
      TransitionComponent={Transition}
      TransitionProps={{ unmountOnExit: true }}>
      <AppBar position="relative">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ my: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box display="flex" justifyContent="end" mb={3} width="100%">
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
