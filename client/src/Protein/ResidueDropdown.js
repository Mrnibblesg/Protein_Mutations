import { MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const residueList = [
  "A - Ala",
  "C - Cys",
  "D - Asp",
  "E - Glu",
  "F - Phe",
  "G - Gly",
  "H - His",
  "I - Ile",
  "K - Lys",
  "L - Leu",
  "M - Met",
  "N - Asn",
  "P - Pro",
  "Q - Gln",
  "R - Arg",
  "S - Ser",
  "T - Thr",
  "V - Val",
  "W - Trp",
  "Y - Tyr",
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
