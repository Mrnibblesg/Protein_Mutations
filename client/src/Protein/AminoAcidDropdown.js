import { MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

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

export default function AminoAcidDropdown({ name, value, handleChange }) {
  return (
    <Box display="flex" alignItems="center" my={1} width={270} justifyContent="space-between">
      <Typography variant="body">Select {name} insert value</Typography>
      <TextField select value={value} onChange={handleChange} name={name} sx={{ ml: 2, width: 60 }}>
        {aminoAcidList.map((aa) => (
          <MenuItem key={aa} value={aa}>
            {aa}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
