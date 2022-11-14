import { AppBar, Box, Button, Dialog, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import PlaceholderHeatmap from "../PlaceholderHeatmap";
import Heatmap from "./Heatmap";
import ResidueDropdown from "./ResidueDropdown";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ResidueSelector({ open, protein, handleClose, residue, handleChange }) {
  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar position="relative">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Select Residues for Insertion Indexes
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ my: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Heatmap protein={protein} />
        <Box display="flex" mt={2}>
          <ResidueDropdown
            value={residue[0]}
            handleChange={handleChange(0)}
            placeholder="First Index"
          />
          <ResidueDropdown
            value={residue[1]}
            handleChange={handleChange(1)}
            placeholder="Second Index"
          />
        </Box>
        <Button variant="contained" sx={{ mt: 2 }}>
          Generate
        </Button>
      </Container>
    </Dialog>
  );
}
