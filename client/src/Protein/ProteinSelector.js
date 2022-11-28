import {
  Button,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import ResidueSelector from "./ResidueSelector";
import createMolstarViewer from "../molstar";
import HeatmapMaker from "./HeatmapMaker";
import ResidueDropdown from "./ResidueDropdown";

export default function ProteinSelector({ protein }) {
  const navigate = useNavigate();
  const molstarRef = useRef();
  const [index, setIndex] = useState(protein.type === "single" ? "" : ["", ""]);
  const [residue, setResidue] = useState(protein.type === "single" ? "" : ["", ""]);
  const [mode, setMode] = useState("insert");
  const [residueOpen, setResidueOpen] = useState(false);

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
        setIndex([e.target.value, index[1]]);
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
        setResidue([residue[0], e.target.value]);
        // If in position 0
      } else {
        setResidue([e.target.value, residue[1]]);
      }
    }
  };

  // Returns true if in bounds, false if not
  const checkBound = (index) => {
    const upperBound = mode === "insert" ? protein.residue_count + 2 : protein.residue_count;
    return index >= 1 && index <= upperBound;
  };
  // Confirm navigation to next stage, locks in index/residue
  // For pairwise insert, will render ResidueSelector with new heatmap
  const handleConfirm = () => {
    // Check index for valid input
    // TODO: Alert user of incorrect input
    // Validate pairwise proteins
    if (protein.type === "pairwise") {
      if (!checkBound(index[0])) {
        return console.log("First index out of bounds or empty");
      } else if (!checkBound(index[1])) {
        return console.log("Second index out of bounds or empty");
      } else if (index[0] == index[1]) {
        return console.log("Indexes should not be equal");
      }
      // Validate single protein
    } else if (!checkBound(index)) {
      return console.log("Index out of bounds or empty");
    } else if (mode === "insert" && !residue) {
      return console.log("A residue must be selected");
    }

    // Display next stage for pairwise insert, else final stage
    if (protein.type === "pairwise" && mode === "insert") {
      setResidueOpen(true);
    } else {
      // Display mutant page, correctly order indexes
    }
  };
  const handleResidueClose = () => {
    // Always array since there shouldn't be a dialog without pairwise insert
    setResidue(["", ""]);
    setResidueOpen(false);
  };

  const handleModeChange = (e) => setMode(e.target.value);

  const title =
    mode === "insert"
      ? protein.type === "single"
        ? "Select insert index and residue"
        : "Select insert indexes"
      : protein.type === "single"
      ? "Select delete index"
      : "Select deletion indexes";

  return (
    <Container>
      <Box
        my={6}
        display="flex"
        flexWrap="wrap"
        sx={{ justifyContent: { xs: "center", md: "space-between" } }}>
        <Typography variant="h4">{title}</Typography>
        <RadioGroup
          value={mode}
          onChange={handleModeChange}
          row
          sx={{ justifyContent: "center", width: "100%", my: 4 }}>
          <FormControlLabel value="insert" control={<Radio />} label="Insert" sx={{ pr: 8 }} />
          <FormControlLabel value="delete" control={<Radio />} label="Delete" />
        </RadioGroup>
        <Box display="flex" flexDirection="column">
          <HeatmapMaker
            protein={protein}
            stage={"index"}
            mode={mode}
            handleIndexChange={handleIndexChange}
            handleResidueChange={handleResidueChange}
            handleConfirm={handleConfirm}
          />
          <div style={{ marginTop: 16 }} />
          <div>
            {protein.type === "single" ? (
              <TextField
                value={index}
                onChange={handleIndexChange(null)}
                variant="outlined"
                placeholder="Index"
                sx={{ width: 130 }}
              />
            ) : (
              <>
                <TextField
                  value={index[0]}
                  onChange={handleIndexChange(0)}
                  variant="outlined"
                  placeholder="First Index"
                  sx={{ mr: 2, width: 130 }}
                />
                <TextField
                  value={index[1]}
                  onChange={handleIndexChange(1)}
                  variant="outlined"
                  placeholder="Second Index"
                  sx={{ width: 130 }}
                />
              </>
            )}
            {protein.type === "single" && mode === "insert" && (
              <ResidueDropdown value={residue} handleChange={handleResidueChange(null)} />
            )}
          </div>
          <Button onClick={handleConfirm} variant="contained" sx={{ mt: 3 }}>
            Test Confirm
          </Button>
        </Box>
        {/* Make more responsive instead of 50% */}
        <div
          ref={molstarRef}
          style={{
            width: "50%",
            height: "100%",
          }}
        />
      </Box>
      <ResidueSelector
        open={residueOpen}
        protein={protein}
        residue={residue}
        handleChange={handleResidueChange}
        handleClose={handleResidueClose}
      />
    </Container>
  );
}
