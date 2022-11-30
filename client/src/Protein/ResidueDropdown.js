import { MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import residues from "../common/residues";

export default function ResidueDropdown({ value, handleChange, placeholder }) {
  return (
    <TextField
      select
      value={value}
      onChange={handleChange}
      sx={{ ml: 2, width: 120 }}
      label="Residue"
      placeholder={placeholder}>
      {residues.map(({ short, long }) => (
        <MenuItem key={short} value={short}>
          {short} - {long}
        </MenuItem>
      ))}
    </TextField>
  );
}
