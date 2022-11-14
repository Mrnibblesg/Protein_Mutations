import { MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const residueList = [
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

export default function ResidueDropdown({ value, handleChange, placeholder }) {
  return (
    <TextField
      select
      value={value}
      onChange={handleChange}
      sx={{ ml: 2, width: 120 }}
      label="Residue"
      placeholder={placeholder}>
      {residueList.map((residue) => (
        <MenuItem key={residue} value={residue}>
          {residue}
        </MenuItem>
      ))}
    </TextField>
  );
}
