import React from "react";
import { Box } from "@mui/system";
import PlaceholderHeatmap from "../PlaceholderHeatmap";
import { Heatmap, HeatmapSeries, HeatmapCell, SequentialLegend, schemes } from 'reaviz';

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
export default function HeatmapMaker({
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

  //xAxis and yAxis are arrays storing the labels along the x and y axis
  let xAxis;
  let yAxis;
  let xAxisCount;
  let yAxisCount;

  //Constructs data from what the proper labels for each axis is, and the heat data inside of protein.
  let constructData = (xAxisLabels, yAxisLabels) => {
    let data = [];
    for (let i = 0; i < xAxisLabels.length; i++){

      let column = {key: xAxisLabels[i], data: []};
      for (let j = 0; j < yAxisLabels.length; j++){
        let square = {key: yAxisLabels[j], data: Math.random() * 50};
        column.data.push(square);
      }
      data.push(column);
    }
    return data;
  };

  let squareClicked = (square) => {
    
    let column = square.value.key;
    let row = square.value.x;
    console.log("col: " + column, "row: " + row);
  }

  //Update the heatMapSize if we know the indices will be more than
  //the original residue amount. So, on insertions and an additional one
  //if the protein is pairwise.
  if (mode === "insert") {
    heatMapSize += 1;
    if (protein.type === "single") {
      // Generate heatmap with insert index on x axis, residue on y axis
      xAxis = Array(heatMapSize).fill(0).map((el, index) => (el = index));
      yAxis = aminoAcidList;
      xAxisCount = heatMapSize;
      yAxisCount = aminoAcidList.length;
    } else {
      heatMapSize += 1;
      if (stage === "index") {
        // Generate heatmap with insert index on both axes
        xAxis = Array(heatMapSize).fill(0).map((el, index) => (el = index));
        yAxis = Array(heatMapSize).fill(0).map((el, index) => (el = index));
        xAxisCount = heatMapSize;
        yAxisCount = heatMapSize;

      } else if (stage === "residue") {
        // Generate heatmap with residues on both axes
        xAxis = aminoAcidList;
        yAxis = aminoAcidList;
        xAxisCount = aminoAcidList.length;
        yAxisCount = aminoAcidList.length;

      } else {
        throw "Should have defined stage for pairwise insert";
      }
    }
  } else if (mode === "delete") {
    if (protein.type === "single") {
      // Not sure if a heatmap is possible here, only one possible axis
      xAxis = Array(heatMapSize).fill(0).map((el, index) => (el = index)).reverse();
      yAxis = ["-"];
      xAxisCount = heatMapSize;
      yAxisCount = 1;
    } else {
      // Generate heatmap with delete indexes on both axes
      xAxis = Array(heatMapSize).fill(0).map((el, index) => (el = index)).reverse();
      yAxis = Array(heatMapSize).fill(0).map((el, index) => (el = index));
      xAxisCount = heatMapSize;
      yAxisCount = heatMapSize;
    }
  }

  //Here is some sample data so you can get an idea of the format.
  /*const data = [
  {
    key: 'Lateral Movement',
    data: [
      {key: 'XML',data: 0},
      {key: 'JSON',data: 120},
      {key: 'HTTPS',data: 150}
    ]
  },
  {
    key: 'Discovery',
    data: [
      {key: 'XML', data: 100},
      {key: 'JSON', data: 34},
      {key: 'HTTPS', data: 0}
    ]
  }
];*/
  let data = constructData(xAxis,yAxis);

  let heatmapContainer = (
    <Box id="mainHeatmapContainer">
      <Heatmap
        height={25 * yAxisCount}
        width={25 * xAxisCount}
        data={data}
        series={
          <HeatmapSeries
            colorScheme={schemes.Reds}
            emptyColor={"#00"}
            padding={0.001}
            cell={
              <HeatmapCell
                style={{ stroke: "#9f9f9f"}}
                onClick={(event) => {squareClicked(event)}}
              />
            }
          />
        }
      />
      <SequentialLegend
        colorScheme={schemes.Reds}
        data={data}
        style={{ height: '165px', marginLeft: '10px' }}
      />

    </Box>
  );

  return heatmapContainer;
}