import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function PlaceholderHeatmap({ xAxisCount, yAxisCount, cellSize }) {
  const randColor = () => {
    return "#" + (Math.random() * 0xff).toString(16).slice(0, 2) + "0000";
  };

  return (
    <Box display="inline-block" flexDirection="column" alignItems="center" sx={{ flexBasis: 0.5 }}>
      {Array(yAxisCount)
        .fill()
        .map((x, row) => (
          <div key={row} style={{ display: "flex" }}>
            {Array(xAxisCount)
              .fill()
              .map((y, col) => (
                <div
                  key={"cell" + row + "-" + col}
                  style={{
                    backgroundColor: randColor(),
                    width: cellSize,
                    height: cellSize,
                  }}
                />
              ))}
          </div>
        ))}
    </Box>
  );
}
