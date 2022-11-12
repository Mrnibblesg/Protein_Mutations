import React from "react";
import PlaceholderHeatmap from "../PlaceholderHeatmap";

// Generate heatmap based on type of protein and mode
export default function Heatmap({
  protein,
  stage,
  handleIndexChange,
  handleResidueChange,
  handleConfirm,
}) {
  console.log(protein);
  // stage prop is either "index" or "residue", indicating which heatmap to display
  // ONLY FOR PAIRWISE INSERT
  // "index" indicates that the heatmap should have insert index on both axes, residues for "residue"
  if (protein.mode === "insert") {
    if (protein.type === "single") {
      // Generate heatmap with insert index on x axis, residue on y axis
    } else {
      if (stage === "index") {
        // Generate heatmap with insert index on both axes
      } else if (stage === "residue") {
        // Generate heatmap with residues on both axes
      } else {
        throw "Should have defined stage for pairwise insert";
      }
    }
  } else if (protein.mode === "delete") {
    if (protein.type === "single") {
      // Not sure if a heatmap is possible here, only one possible axis
    } else {
      // Generate heatmap with delete indexes on both axes
    }
  }
  return <PlaceholderHeatmap residueCount={protein.residue_count} />;
}
