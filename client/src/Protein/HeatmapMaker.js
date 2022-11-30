import React from "react";
import { Box } from "@mui/system";
import {
  Heatmap,
  HeatmapSeries,
  HeatmapCell,
  ChartTooltip,
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

  const heatmapColorScheme = ['#570000', '#650000', '#730000', '#820000', '#900000', '#9f0000', '#af0000', '#be0000', '#ce0000', '#de0000', '#ef0000', '#ff0200', '#ff3d00', '#ff5800', '#ff6d00', '#ff8000', '#ff9000', '#ffa000', '#ffaf00', '#ffbd00', '#ffcc00', '#ffd900', '#ffe700', '#fff400', '#fdfcc1'];

  //CURRENTLY HARDCODED TO TEST BEFORE ACTUAL DATA IS ROUTED THROUGH!!!
  let testHeatData = [[ 0.0, 19.0, 19.0, 19.0, 67.0, 67.0, 67.0, 67.0, 22.0, 67.0, 65.0, 30.0, 67.0, 45.0, -19.0, 6.0, 87.0, 79.0, 87.0, -8.0], [ 19.0, 0.0, 19.0, 19.0, 67.0, 67.0, 67.0, 67.0, 67.0, 67.0, 59.0, 67.0, 65.0, 45.0, 67.0, 11.0, 43.0, 87.0, 39.0, 43.0], [ 19.0, 19.0, 0.0, 67.0, -4.0, 67.0, 48.0, 67.0, 67.0, 67.0, 67.0, 63.0, 59.0, 65.0, 67.0, 58.0, 87.0, 19.0, 87.0, 48.0], [ 19.0, 19.0, 67.0, 0.0, 67.0, 67.0, 67.0, 67.0, 67.0, 35.0, -8.0, 65.0, 67.0, 65.0, 33.0, 80.0, 42.0, 61.0, 87.0, 45.0], [ 67.0, 67.0, -4.0, 67.0, 0.0, 67.0, 44.0, 44.0, 67.0, 67.0, 47.0, 59.0, 57.0, 65.0, 57.0, 84.0, 70.0, 87.0, 79.0, 17.0], [ 67.0, 67.0, 67.0, 67.0, 67.0, 0.0, 67.0, 67.0, 21.0, 67.0, 67.0, 65.0, 48.0, 65.0, 67.0, 92.0, 85.0, 79.0, 79.0, 59.0], [ 67.0, 67.0, 48.0, 67.0, 44.0, 67.0, 0.0, 45.0, 14.0, 45.0, 13.0, 45.0, 45.0, 45.0, 2.0, 70.0, 85.0, 79.0, 77.0, 18.0], [ 67.0, 67.0, 67.0, 67.0, 44.0, 67.0, 45.0, 0.0, 22.0, -6.0, 45.0, 45.0, 36.0, 67.0, 67.0, 82.0, 87.0, 85.0, 79.0, 8.0], [ 22.0, 67.0, 67.0, 67.0, 67.0, 21.0, 14.0, 22.0, 0.0, -12.0, 43.0, 7.0, 45.0, -27.0, 65.0, 92.0, 81.0, 85.0, 67.0, -38.0], [ 67.0, 67.0, 67.0, 35.0, 67.0, 67.0, 45.0, -6.0, -12.0, 0.0, 45.0, 45.0, 45.0, 59.0, 67.0, 80.0, 66.0, 77.0, 87.0, 19.0], [ 65.0, 59.0, 67.0, -8.0, 47.0, 67.0, 13.0, 45.0, 43.0, 45.0, 0.0, 26.0, 45.0, 65.0, -11.0, 92.0, 87.0, 75.0, 77.0, 24.0], [ 30.0, 67.0, 63.0, 65.0, 59.0, 65.0, 45.0, 45.0, 7.0, 45.0, 26.0, 0.0, 16.0, 1.0, 61.0, 80.0, 87.0, 42.0, 79.0, 51.0], [ 67.0, 65.0, 59.0, 67.0, 57.0, 48.0, 45.0, 36.0, 45.0, 45.0, 45.0, 16.0, 0.0, 36.0, 60.0, 56.0, 53.0, 85.0, 87.0, 65.0], [ 45.0, 45.0, 65.0, 65.0, 65.0, 65.0, 45.0, 67.0, -27.0, 59.0, 65.0, 1.0, 36.0, 0.0, 53.0, 92.0, 79.0, 53.0, 87.0, -34.0], [ -19.0, 67.0, 67.0, 33.0, 57.0, 67.0, 2.0, 67.0, 65.0, 67.0, -11.0, 61.0, 60.0, 53.0, 0.0, 14.0, 87.0, -21.0, 27.0, -33.0], [ 6.0, 11.0, 58.0, 80.0, 84.0, 92.0, 70.0, 82.0, 92.0, 80.0, 92.0, 80.0, 56.0, 92.0, 14.0, 0.0, 39.0, 2.0, 48.0, -30.0], [ 87.0, 43.0, 87.0, 42.0, 70.0, 85.0, 85.0, 87.0, 81.0, 66.0, 87.0, 87.0, 53.0, 79.0, 87.0, 39.0, 0.0, 82.0, 91.0, 9.0], [ 79.0, 87.0, 19.0, 61.0, 87.0, 79.0, 79.0, 85.0, 85.0, 77.0, 75.0, 42.0, 85.0, 53.0, -21.0, 2.0, 82.0, 0.0, 20.0, 12.0], [ 87.0, 39.0, 87.0, 87.0, 79.0, 79.0, 77.0, 79.0, 67.0, 87.0, 77.0, 79.0, 87.0, 87.0, 27.0, 48.0, 91.0, 20.0, 0.0, -9.0], [ -8.0, 43.0, 48.0, 45.0, 17.0, 59.0, 18.0, 8.0, -38.0, 19.0, 24.0, 51.0, 65.0, -34.0, -33.0, -30.0, 9.0, 12.0, -9.0, 0.0]];
  stage = "index";
  mode = "delete";

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
        let square;
        if (isNaN(heat)){
          square = { key: yAxisLabels[j], data: null};
        }
        else if (stage === "index" && i === j){
          square = { key: yAxisLabels[j], data: null};
        }
        else{
          square = { key: yAxisLabels[j], data: heat};
        }
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
            colorScheme={heatmapColorScheme}
            emptyColor={"#000000"}
            padding={0.0001} //A value of 0 defaults to 0.1. So set it close to 0
            cell={
              <HeatmapCell
                style={{ stroke: "rgba(0,0,0,0)" }}
                onClick={(event) => {
                  squareClicked(event);
                }}
                tooltip={
                  <ChartTooltip
                    color={'rgb(255,0,0,0.5)'}
                  />
                }
              />
            }
          />
        }
      />
      <SequentialLegend
        colorScheme={heatmapColorScheme}
        data={data}
        style={{ height: 25 * (yAxisCount - 1), marginLeft: "10px" }}
      />
    </Box>
  );

  return heatmapContainer;
}
