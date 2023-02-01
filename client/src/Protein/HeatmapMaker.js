import React from "react";
import { Box } from "@mui/system";
import {
  Heatmap,
  HeatmapSeries,
  HeatmapCell,
  ChartTooltip,
  SequentialLegend,
  LinearXAxisTickLabel,
  LinearXAxis,
  LinearXAxisTickSeries,
  LinearAxisTickLine,
} from "reaviz";
import { shortResidues as residues } from "../common/residues";
import {
  singleInsert,
  singleDelete,
  pairwiseInsertRes,
  pairwiseInsertIdx,
  pairwiseDelete,
} from "../common/heatmaps";
import { Typography } from "@mui/material";

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

  const heatmapColorScheme = [
    "#570000",
    "#650000",
    "#730000",
    "#820000",
    "#900000",
    "#9f0000",
    "#af0000",
    "#be0000",
    "#ce0000",
    "#de0000",
    "#ef0000",
    "#ff0200",
    "#ff3d00",
    "#ff5800",
    "#ff6d00",
    "#ff8000",
    "#ff9000",
    "#ffa000",
    "#ffaf00",
    "#ffbd00",
    "#ffcc00",
    "#ffd900",
    "#ffe700",
    "#fff400",
    "#fdfcc1",
  ];

  //CURRENTLY HARDCODED TO TEST BEFORE ACTUAL DATA IS ROUTED THROUGH!!!

  //the amount of indices for the heatmap to display
  let heatMapSize = protein.residue_count;

  //xAxis and yAxis are arrays storing the labels along the x and y axis
  let xAxis;
  let yAxis;
  let xAxisCount;
  let yAxisCount;

  const heatmap = () => {
    if (protein.pdb_id === "1l2y") {
      if (protein.type === "single") {
        if (mode === "insert") {
          return singleInsert;
        } else {
          return singleDelete;
        }
      } else {
        if (mode === "insert") {
          if (stage === "index") {
            return pairwiseInsertIdx;
          } else {
            return pairwiseInsertRes;
          }
        } else {
          return pairwiseDelete;
        }
      }
    } else {
      return null;
    }
  };

  //Constructs data from what the proper labels for each axis is, and the heat data inside of protein.
  let constructData = (xAxisLabels, yAxisLabels) => {
    let data = [];
    const graph = heatmap();
    if (!graph) {
      return null;
    }

    //We must keep this until the extra column of 0s is removed from the data on the DB.
    const xLength =
      protein.type === "single" && mode === "delete" ? xAxisLabels.length : xAxisLabels.length - 1;
    const yLength =
      protein.type === "single" && mode === "delete" ? yAxisLabels.length : yAxisLabels.length - 1;

    for (let i = 0; i < xLength; i++) {
      let column = { key: xAxisLabels[i], data: [] };
      for (let j = 0; j < yLength; j++) {
        let heat = graph[j][i];
        let square = { key: yAxisLabels[j], data: heat };

        //Heat is null (shows as a black square) if there is no heatmap data for the square, or
        //if the indices are the same on a pairwise indel index x index heatmap.
        if (isNaN(heat) || (protein.type === "pairwise" && stage === "index" && i === j)) {
          square.data = null;
        }
        column.data.push(square);
      }
      data.push(column);
    }
    return data;
  };

  //When the square is clicked, call handler functions which
  //will populate the input fields accordingly.
  let squareClicked = (square) => {
    let column = square.value.key;
    let row = square.value.x;
    // X axis defaults to first text field, Y axis defaults to second
    if (protein.type === "single") {
      handleIndexChange(column);
      if (mode === "insert") {
        handleResidueChange(row);
      }
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
      // Only one axis for this heatmap. The heatmap will display as a line of squares.
      xAxis = Array(heatMapSize)
        .fill(0)
        .map((el, index) => (el = index + 1));
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
      {data ? (
        <>
          <Heatmap
            height={25 * yAxisCount}
            width={25 * xAxisCount}
            data={data}
            data-testid="heatmap"
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
                    rx={0}
                    onClick={(event) => {
                      squareClicked(event);
                    }}
                    tooltip={<ChartTooltip color={"rgb(255,0,0,0.5)"} />}
                  />
                }
              />
            }
          />
          <SequentialLegend
            colorScheme={heatmapColorScheme}
            data={data}
            style={{ height: 25 * (yAxisCount - 1), marginLeft: "10px", minHeight: 100 }}
          />
        </>
      ) : (
        <Typography variant="h4" gutterBottom>
          There was an error loading the heatmap, try a different protein (1l2y, probably)
        </Typography>
      )}
    </Box>
  );

  return heatmapContainer;
}
