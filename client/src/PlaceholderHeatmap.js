import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const LENGTH = 400;

export default function PlaceholderHeatmap({ residueCount }) {
  const randColor = () => {
    return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).slice(0, 6);
  };
  const cellLength = LENGTH / residueCount;
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" width={LENGTH} height={LENGTH} flexWrap="wrap">
        {Array(residueCount * residueCount - 1)
          .fill()
          .map((x, idx) => {
            return (
              <div
                key={"cell" + idx}
                style={{
                  backgroundColor: randColor(),
                  width: cellLength,
                  height: cellLength,
                }}
              />
            );
          })}
      </Box>
    </Box>
  );
}
