import { MenuItem, TextField } from "@mui/material";
import React from "react";
import residues from "../common/residues";

export default function ResidueDropdown({ value, handleChange, placeholder }) {
  return (
    <TextField
      select
      value={value}
      onChange={handleChange}
      sx={{ ml: 2, width: 120 }}
      label="Residue"
      name="residueField"
      inputProps={{ "data-testid": "residueDropdown" }}
      placeholder={placeholder}>
      {residues.map(({ short, long }) => (
        <MenuItem key={short} value={short}>
          {short} - {long}
        </MenuItem>
      ))}
    </TextField>
  );
}
