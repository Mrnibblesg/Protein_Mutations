import React from "react";
import { Box } from "@mui/system";
import PlaceholderHeatmap from "../PlaceholderHeatmap";

const aminoAcidList = [
  "A",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "K",
  "L",
  "M",
  "N",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "V",
  "W",
  "Y",
];

// Generate heatmap based on type of protein and mode
// Assume heatmap data is stored within protein
export default function Heatmap({
  protein,
  stage,
  mode,
  handleIndexChange,
  handleResidueChange,
  handleConfirm,
}) {
  // stage prop is either "index" or "residue", indicating which heatmap to display
  // ONLY FOR PAIRWISE INSERT
  // "index" indicates that the heatmap should have insert index on both axes, residues for "residue"

  const LENGTH = 400;
  const cellSize = LENGTH / protein.residue_count;

  //the amount of indices for the heatmap to display
  let heatMapSize = protein.residue_count;

  //Create axis div lists and build onto them depending on our needs for this heatmap
  let xAxis;
  let yAxis;
  let xAxisCount;
  let yAxisCount;

  //Populate the axes
  //values is either an index array or a residue array.
  const populateAxis = (axis, values) => {
    if (axis === "x") {
      return (
        <Box display="flex" flexDirection={"row"} style={{ paddingLeft: cellSize }}>
          {values.map((value) => (
            <div
              style={{
                float: "left",
                width: cellSize,
              }}
              display="inline-block"
              key={value}>
              {value}
            </div>
          ))}
        </Box>
      );
    } else {
      return (
        <Box display="flex" flexDirection={"column"} style={{ float: "left" }}>
          {values.map((value) => (
            <div
              style={{
                height: cellSize,
              }}
              display="inline-block"
              key={value}>
              {value}
            </div>
          ))}
        </Box>
      );
    }
  };

  //Update the heatMapSize if we know the indices will be more than
  //the original residue amount. So, on insertions and an additional one
  //if the protein is pairwise.
  if (mode === "insert") {
    heatMapSize += 1;
    if (protein.type === "single") {
      // Generate heatmap with insert index on x axis, residue on y axis
      xAxis = populateAxis(
        "x",
        Array(heatMapSize)
          .fill(0)
          .map((el, index) => (el = index))
      );
      yAxis = populateAxis("y", aminoAcidList);
      xAxisCount = heatMapSize;
      yAxisCount = aminoAcidList.length;
    } else {
      heatMapSize += 1;
      if (stage === "index") {
        // Generate heatmap with insert index on both axes
        xAxis = populateAxis(
          "x",
          Array(heatMapSize)
            .fill(0)
            .map((el, index) => (el = index))
        );
        yAxis = populateAxis(
          "y",
          Array(heatMapSize)
            .fill(0)
            .map((el, index) => (el = index))
            .reverse()
        );
        xAxisCount = heatMapSize;
        yAxisCount = heatMapSize;
      } else if (stage === "residue") {
        // Generate heatmap with residues on both axes
        xAxis = populateAxis("x", aminoAcidList);
        yAxis = populateAxis("y", aminoAcidList);
        xAxisCount = aminoAcidList.length;
        yAxisCount = aminoAcidList.length;
      } else {
        throw "Should have defined stage for pairwise insert";
      }
    }
  } else if (mode === "delete") {
    if (protein.type === "single") {
      // Not sure if a heatmap is possible here, only one possible axis
      xAxis = populateAxis(
        "x",
        Array(heatMapSize)
          .fill(0)
          .map((el, index) => (el = index))
          .reverse()
      );
      yAxis = populateAxis("y", ["-"]);
      xAxisCount = heatMapSize;
      yAxisCount = 1;
    } else {
      // Generate heatmap with delete indexes on both axes
      xAxis = populateAxis(
        "x",
        Array(heatMapSize)
          .fill(0)
          .map((el, index) => (el = index))
          .reverse()
      );
      yAxis = populateAxis(
        "y",
        Array(heatMapSize)
          .fill(0)
          .map((el, index) => (el = index))
      );
      xAxisCount = heatMapSize;
      yAxisCount = heatMapSize;
    }
  }

  let heatmapContainer = (
    <Box id="mainHeatmapContainer">
      <Box flexDirection="row">
        {yAxis}
        <PlaceholderHeatmap xAxisCount={xAxisCount} yAxisCount={yAxisCount} cellSize={cellSize} />
      </Box>
      {xAxis}
    </Box>
  );

  return heatmapContainer;
}
