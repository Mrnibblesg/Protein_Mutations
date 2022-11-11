import { Box } from "@mui/material";
import React from "react";
import PlaceholderHeatmap from "../PlaceholderHeatmap";
import Heatmap from "./Heatmap";

export default function ResidueSelector({ protein }) {
  return (
    <Box>
      <Heatmap protein={protein} stage="residue" />
    </Box>
  );
}
