import React from "react";
import { Box } from "@mui/system";
import {
  Heatmap,
  HeatmapSeries,
  HeatmapCell,
  SequentialLegend,
  schemes,
  LinearAxis,
  LinearXAxisTickLabel,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearAxisTickLine,
} from "reaviz";
import { shortResidues as residues } from "../common/residues";

// Generate heatmap based on type of protein and mode
// Assume heatmap data is stored within protein
export default function HeatmapMaker({
  protein,
  stage,
  mode,
  handleIndexChange,
  handleResidueChange,
}) {
  // stage prop is either "index" or "residue", indicating which heatmap to display
  // ONLY FOR PAIRWISE INSERT
  // "index" indicates that the heatmap should have insert index on both axes, residues for "residue"

  let testHeatData = [[45.0, 45.0, 45.0, 19.0, 19.0, 19.0, 19.0, 45.0, 19.0, 19.0, 45.0, 19.0, 45.0, 19.0, -27.0, 19.0, 19.0, -7.0, 19.0, 19.0], [45.0, 19.0, -4.0, -7.0, 19.0, 19.0, 45.0, 19.0, -52.0, 19.0, -4.0, 19.0, -7.0, 45.0, 45.0, 26.0, 19.0, 19.0, 19.0, 45.0], [19.0, 19.0, 45.0, 19.0, 19.0, 45.0, 19.0, 45.0, 19.0, 19.0, 19.0, 19.0, -7.0, 19.0, 45.0, 45.0, 19.0, 19.0, 26.0, 19.0], [19.0, -4.0, 19.0, 19.0, 19.0, 19.0, 45.0, 45.0, 45.0, 45.0, -7.0, -7.0, 45.0, 19.0, 45.0, 45.0, 45.0, 19.0, 19.0, -7.0], [-4.0, 0.0, -7.0, 26.0, 45.0, 19.0, -4.0, -7.0, -7.0, 19.0, 45.0, 45.0, 19.0, 45.0, -7.0, 19.0, 19.0, 45.0, 26.0, -7.0], [19.0, 45.0, 19.0, 45.0, 19.0, 45.0, 26.0, 45.0, 45.0, 26.0, 19.0, 45.0, 45.0, 26.0, -7.0, 19.0, 19.0, 45.0, 45.0, 45.0], [45.0, 19.0, 19.0, 45.0, -7.0, 0.0, 19.0, 19.0, 19.0, 45.0, -4.0, 19.0, 45.0, 19.0, 45.0, 19.0, 45.0, 19.0, 19.0, 19.0], [19.0, 19.0, 19.0, 45.0, 19.0, 26.0, 19.0, -1.0, 19.0, 45.0, 19.0, 19.0, -7.0, 19.0, 45.0, 45.0, 19.0, 26.0, 45.0, 19.0], [45.0, 45.0, 19.0, 19.0, 26.0, 45.0, 19.0, 19.0, -10.0, 19.0, 19.0, 19.0, 45.0, 19.0, 45.0, 19.0, 19.0, 45.0, 19.0, 19.0], [45.0, 19.0, 45.0, 19.0, 45.0, 19.0, 19.0, 45.0, 19.0, 19.0, 26.0, 45.0, 19.0, 19.0, 19.0, 19.0, 19.0, 19.0, 45.0, 45.0], [45.0, 45.0, 19.0, 19.0, 19.0, 19.0, 45.0, 45.0, 45.0, 45.0, 19.0, 5.0, 19.0, 19.0, -23.0, 45.0, 22.0, 45.0, 19.0, 45.0], [45.0, 3.0, -23.0, 19.0, 67.0, 19.0, 19.0, 19.0, 0.0, 19.0, 19.0, 19.0, 19.0, 19.0, 45.0, 19.0, 19.0, 45.0, 45.0, 26.0], [45.0, 45.0, 19.0, 19.0, 19.0, 45.0, 45.0, 19.0, -7.0, 45.0, 45.0, 45.0, 19.0, 45.0, 45.0, 26.0, 19.0, 19.0, 19.0, 19.0], [19.0, 19.0, 45.0, 19.0, 45.0, -7.0, 45.0, 19.0, 19.0, 45.0, 19.0, 45.0, 45.0, -27.0, -30.0, -7.0, 19.0, 26.0, 19.0, 19.0], [19.0, 45.0, 19.0, 19.0, 19.0, 19.0, 19.0, 0.0, 19.0, 45.0, 26.0, -4.0, -27.0, 19.0, -4.0, 45.0, 19.0, 45.0, 19.0, 0.0], [45.0, 19.0, 19.0, 45.0, 19.0, 19.0, 45.0, 19.0, 45.0, 19.0, 19.0, 45.0, 26.0, -7.0, 26.0, 19.0, 19.0, 19.0, 19.0, -4.0], [19.0, 19.0, 19.0, 45.0, -4.0, 19.0, 45.0, 0.0, 45.0, 19.0, 19.0, 26.0, -23.0, 45.0, -27.0, 19.0, 0.0, 45.0, 19.0, 26.0], [45.0, 45.0, 19.0, -7.0, 19.0, -4.0, 45.0, 45.0, 45.0, 19.0, 19.0, 19.0, 19.0, 19.0, 45.0, 19.0, -7.0, 19.0, 45.0, 19.0], [0.0, 19.0, 45.0, 45.0, 0.0, 19.0, 3.0, 19.0, 0.0, 19.0, -7.0, 45.0, 19.0, 19.0, 45.0, 19.0, 26.0, 45.0, 19.0, 19.0], [19.0, 19.0, -7.0, 19.0, 19.0, 19.0, 45.0, -7.0, 45.0, -7.0, -7.0, 0.0, 45.0, -7.0, -7.0, 19.0, 45.0, 19.0, 19.0, 45.0]]

  stage = "residue";

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
    for (let i = 0; i < xAxisLabels.length; i++) {
      let column = { key: xAxisLabels[i], data: [] };
      for (let j = 0; j < yAxisLabels.length; j++) {

        let heat = testHeatData[j][i];
        if (isNaN(heat)){
          heat = 0;
        }
        
        let square = { key: yAxisLabels[j], data: heat};
        column.data.push(square);
      }
      data.push(column);
    }
    return data;
  };

  let squareClicked = (square) => {
    let column = square.value.key;
    let row = square.value.x;
    // X axis defaults to first text field, Y axis defaults to second
    if (protein.type === "single") {
      handleIndexChange(column);
      mode === "insert" && handleResidueChange(row);
    } else if (protein.type === "pairwise" && mode === "insert") {
      // Stage determines which heatmap is being used for pairwise insert
      if (stage === "index") {
        handleIndexChange(column, 0);
        handleIndexChange(row, 1);
      } else if (stage === "residue") {
        handleResidueChange(column, 0);
        handleResidueChange(row, 1);
      }
    } else if (protein.type === "pairwise" && mode === "delete") {
      handleIndexChange(column, 0);
      handleIndexChange(row, 1);
    }
  };

  //Update the heatMapSize if we know the indices will be more than
  //the original residue amount. So, on insertions and an additional one
  //if the protein is pairwise.
  if (mode === "insert") {
    heatMapSize += 1;
    if (protein.type === "single") {
      // Generate heatmap with insert index on x axis, residue on y axis
      xAxis = Array(heatMapSize)
        .fill(0)
        .map((el, index) => (el = index + 1));
      yAxis = residues;
      xAxisCount = heatMapSize;
      yAxisCount = residues.length;
    } else {
      heatMapSize += 1;
      if (stage === "index") {
        // Generate heatmap with insert index on both axes
        xAxis = Array(heatMapSize)
          .fill(0)
          .map((el, index) => (el = index + 1));
        yAxis = Array(heatMapSize)
          .fill(0)
          .map((el, index) => (el = index + 1));
        xAxisCount = heatMapSize;
        yAxisCount = heatMapSize;
      } else if (stage === "residue") {
        // Generate heatmap with residues on both axes
        xAxis = residues;
        yAxis = residues;
        xAxisCount = residues.length;
        yAxisCount = residues.length;
      } else {
        throw "Should have defined stage for pairwise insert";
      }
    }
  } else if (mode === "delete") {
    if (protein.type === "single") {
      // Not sure if a heatmap is possible here, only one possible axis
      xAxis = Array(heatMapSize)
        .fill(0)
        .map((el, index) => (el = index + 1))
        .reverse();
      yAxis = ["-"];
      xAxisCount = heatMapSize;
      yAxisCount = 1;
    } else {
      // Generate heatmap with delete indexes on both axes
      xAxis = Array(heatMapSize)
        .fill(0)
        .map((el, index) => (el = index + 1));
      yAxis = Array(heatMapSize)
        .fill(0)
        .map((el, index) => (el = index + 1));
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
  let data = constructData(xAxis, yAxis);

  let heatmapContainer = (
    <Box id="mainHeatmapContainer" display="flex" alignItems="center">
      <Heatmap
        height={25 * yAxisCount}
        width={25 * xAxisCount}
        data={data}
        xAxis={
          <LinearXAxis
            type="category"
            axisLine={null}
            tickSeries={
              <LinearXAxisTickSeries
                line={<LinearAxisTickLine strokeWidth={0} size={14} />}
                label={<LinearXAxisTickLabel padding={5} />}
              />
            }
          />
        }
        series={
          <HeatmapSeries
            colorScheme={schemes.Reds}
            emptyColor={"#00"}
            padding={0.01}
            cell={
              <HeatmapCell
                style={{ stroke: "#9f9f9f" }}
                onClick={(event) => {
                  squareClicked(event);
                }}
              />
            }
          />
        }
      />
      <SequentialLegend
        colorScheme={schemes.Reds}
        data={data}
        style={{ height: 25 * (yAxisCount - 1), marginLeft: "10px" }}
      />
    </Box>
  );

  return heatmapContainer;
}
