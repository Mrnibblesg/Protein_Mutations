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
import ResidueSelector from "./ResidueSelector";
import createMolstarViewer from "../molstar";
import HeatmapMaker from "./HeatmapMaker";
import ResidueDropdown from "./ResidueDropdown";
import { useNotification } from "../NotificationContext";
import axios from "axios";
import MolstarViewer from "../MolstarViewer";
import Mutant from "./Mutant";

export default function ProteinSelector({ protein }) {
  const { setNotification } = useNotification();
  const molstarRef = useRef();
  const initialParams = protein.type === "single" ? "" : ["", ""];
  const [index, setIndex] = useState(initialParams);
  const [residue, setResidue] = useState(initialParams);
  const [mode, setMode] = useState("insert");
  const [residueOpen, setResidueOpen] = useState(false);
  const [mutantOpen, setMutantOpen] = useState(false);
  const [mutant, setMutant] = useState();

  // Only pass position if pairwise
  const handleIndexChange = (value, position) => {
    // Handle single
    if (protein.type === "single") {
      setIndex(value);
      // Handle pairwise
    } else {
      // If in position 1
      if (position) {
        setIndex([index[0], value]);
        // If in position 0
      } else {
        setIndex([value, index[1]]);
      }
    }
  };
  const handleIdxTextChange = (position) => (e) => {
    handleIndexChange(e.target.value, position);
  };
  // Only pass in position if pairwise
  const handleResidueChange = (value, position) => {
    // Handle single
    if (protein.type === "single") {
      setResidue(value);
      // Handle pairwise
    } else {
      // If in position 1
      if (position) {
        setResidue([residue[0], value]);
        // If in position 0
      } else {
        setResidue([value, residue[1]]);
      }
    }
  };
  const handleResTextChange = (position) => (e) => {
    handleResidueChange(e.target.value, position);
  };

  // Returns true if in bounds, false if not
  const checkBound = (index) => {
    const upperBound = mode === "insert" ? protein.residue_count + 2 : protein.residue_count;
    return index >= 1 && index <= upperBound;
  };
  // Confirm navigation to next stage, locks in index/residue
  // For pairwise insert, will render ResidueSelector with new heatmap
  const handleConfirm = async () => {
    // Check index for valid input
    // TODO: Alert user of incorrect input
    // Validate pairwise proteins
    if (protein.type === "pairwise") {
      if (!checkBound(index[0])) {
        return setNotification("First index out of bounds or empty");
      } else if (!checkBound(index[1])) {
        return setNotification("Second index out of bounds or empty");
      } else if (index[0] == index[1]) {
        return setNotification("Indexes should not be equal");
      }
      // Validate single protein
    } else if (!checkBound(index)) {
      return setNotification("Index out of bounds or empty");
    } else if (mode === "insert" && !residue) {
      return setNotification("A residue must be selected");
    }

    // Display next stage for pairwise insert, else final stage
    if (protein.type === "pairwise" && mode === "insert") {
      setResidueOpen(true);
    } else {
      setMutantOpen(true);
      await getMutant();
    }
  };
  const handleResidueClose = () => {
    setResidue(initialParams);
    setResidueOpen(false);
  };
  const handleMutantClose = () => {
    // Reset state
    setResidue(initialParams);
    setIndex(initialParams);
    setMutantOpen(false);
    setMutant();
  };

  const handleModeChange = (e) => setMode(e.target.value);

  // Only for pairwise insert
  const handleResidueConfirm = async () => {
    if (residue[0] && residue[1]) {
      setResidueOpen(false);
      setMutantOpen(true);
      await getMutant();
    } else {
      setNotification("Please select two residues");
    }
  };

  const getMutant = async () => {
    try {
      const orderedIndex = index instanceof Array ? index.sort() : index;
      const response = await axios.post("http://localhost:8080/api/get-mutant", {
        pdb_id: protein.pdb_id,
        mode: mode === "insert" ? "ins" : "del",
        type: protein.type,
        // Order index and residue
        index: orderedIndex,
        residue,
      });
      console.log(response.data);
      setMutant(response.data);
    } catch (error) {
      console.error(error);
      setNotification("There was an issue retrieving mutant");
    }
  };

  const title =
    mode === "insert"
      ? protein.type === "single"
        ? "Select insert index and residue"
        : "Select insert indexes"
      : protein.type === "single"
      ? "Select delete index"
      : "Select deletion indexes";

  return (
    <Container sx={{ my: 6 }}>
      <Box
        mb={5}
        display="flex"
        flexDirection="column"
        sx={{ justifyContent: "center", alignItems: "center" }}>
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
                onChange={handleIdxTextChange(null)}
                variant="outlined"
                placeholder="Index"
                sx={{ width: 130 }}
              />
            ) : (
              <>
                <TextField
                  value={index[0]}
                  onChange={handleIdxTextChange(0)}
                  variant="outlined"
                  placeholder="First Index"
                  sx={{ mr: 2, width: 130 }}
                />
                <TextField
                  value={index[1]}
                  onChange={handleIdxTextChange(1)}
                  variant="outlined"
                  placeholder="Second Index"
                  sx={{ width: 130 }}
                />
              </>
            )}
            {protein.type === "single" && mode === "insert" && (
              <ResidueDropdown value={residue} handleChange={handleResTextChange(null)} />
            )}
          </div>
          <Button onClick={handleConfirm} variant="contained" sx={{ mt: 3 }}>
            Test Confirm
          </Button>
        </Box>
        {/* Make more responsive instead of 50% */}
      </Box>
      <ResidueSelector
        open={residueOpen}
        protein={protein}
        residue={residue}
        mode={mode}
        handleChange={handleResTextChange}
        handleClose={handleResidueClose}
        handleConfirm={handleResidueConfirm}
      />
      {mutant && (
        <Mutant
          open={mutantOpen}
          mutant={mutant}
          type={protein.type}
          handleClose={handleMutantClose}
          mode={mode}
        />
      )}
      <MolstarViewer pdbStr={protein.wild_type.pdb_data.pdb} />
    </Container>
  );
}
