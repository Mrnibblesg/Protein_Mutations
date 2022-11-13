import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const LENGTH = 400;

export default function PlaceholderHeatmap({ residueCount }) {
  // Random color
  const randColor = () => {
    return "#" + (Math.random() * 0xff).toString(16).slice(0, 2) + "0000";
  };

  const cellLength = LENGTH / residueCount;
  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ flexBasis: 0.5 }}>
      {Array(residueCount)
        .fill()
        .map((x, row) => (
          <div key={row} style={{ display: "flex" }}>
            {Array(residueCount)
              .fill()
              .map((y, col) => (
                <div
                  key={"cell" + row + "-" + col}
                  style={{
                    backgroundColor: randColor(),
                    width: cellLength,
                    height: cellLength,
                  }}
                />
              ))}
          </div>
        ))}
    </Box>
  );
}
