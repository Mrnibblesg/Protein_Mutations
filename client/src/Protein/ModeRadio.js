import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

export default function ModeRadio({ mode, handleModeChange }) {
  return (
    <RadioGroup
      value={mode}
      onChange={handleModeChange}
      row
      sx={{ justifyContent: "center", width: "100%", my: 4 }}>
      <FormControlLabel
        value="insert"
        name="Insert"
        control={<Radio />}
        label="Insert"
        sx={{ pr: 8 }}
      />
      <FormControlLabel value="delete" name="Delete" control={<Radio />} label="Delete" />
    </RadioGroup>
  );
}
