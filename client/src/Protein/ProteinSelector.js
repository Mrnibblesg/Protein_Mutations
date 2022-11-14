import { Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import ResidueSelector from "./ResidueSelector";
import createMolstarViewer from "../molstar";
import Heatmap from "./Heatmap";

export default function ProteinSelector({ protein }) {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const molstarRef = useRef();
  // Index can either be [int, int] or int
  const [index, setIndex] = useState(protein.type === "single" ? "" : ["", ""]);
  const [residue, setResidue] = useState(protein.type === "single" ? "" : ["", ""]);
  const [mode, setMode] = useState("insert");

  useEffect(() => {
    const createViewer = async () => {
      await createMolstarViewer(molstarRef.current, protein.wild_type.pdb_data.pdb);
    };
    createViewer();
  }, [protein]);

  // Only pass position if pairwise
  const handleIndexChange = (position) => (e) => {
    // Handle single
    if (protein.type === "single") {
      setIndex(e.target.value);
      // Handle pairwise
    } else {
      // If in position 1
      if (position) {
        setIndex([index[0], e.target.value]);
        // If in position 0
      } else {
        setIndex([e.target.value], index[1]);
      }
    }
  };
  // Only pass in position if pairwise
  const handleResidueChange = (position) => (e) => {
    // Handle single
    if (protein.type === "single") {
      setResidue(e.target.value);
      // Handle pairwise
    } else {
      // If in position 1
      if (position) {
        setResidue([index[0], e.target.value]);
        // If in position 0
      } else {
        setResidue([e.target.value], index[1]);
      }
    }
  };

  // Confirm navigation to next stage, locks in index/residue
  // For pairwise insert, will render ResidueSelector with new heatmap
  const handleConfirm = () => {};

  const handleModeChange = (e) => setMode(e.target.value);

  return (
    <Box my={6} mx={4} display="flex" flexWrap="wrap">
      <RadioGroup
        value={mode}
        onChange={handleModeChange}
        row
        sx={{ justifyContent: "center", width: "100%", my: 2 }}>
        <FormControlLabel value="insert" control={<Radio />} label="Insert" sx={{ pr: 8 }} />
        <FormControlLabel value="delete" control={<Radio />} label="Delete" />
      </RadioGroup>
      <Heatmap
        protein={protein}
        stage={"index"}
        mode={mode}
        handleIndexChange={handleIndexChange}
        handleResidueChange={handleResidueChange}
        handleConfirm={handleConfirm}
      />
      <Box display="flex" flexDirection="column">
        <div ref={molstarRef} />
        {protein.type === "single" ? (
          <TextField
            value={index}
            onChange={handleIndexChange(null)}
            variant="outlined"
            placeholder="Index"
          />
        ) : (
          <div>
            <TextField
              value={index[0]}
              onChange={handleIndexChange(0)}
              variant="outlined"
              placeholder="First Index"
              sx={{ mr: 2 }}
            />
            <TextField
              value={index[1]}
              onChange={handleIndexChange(1)}
              variant="outlined"
              placeholder="Second Index"
            />
          </div>
        )}
      </Box>
    </Box>
  );
}
