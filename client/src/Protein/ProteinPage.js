import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { Box, Button, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { Container } from "@mui/system";
import AminoAcidDropdown from "./AminoAcidDropdown";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import createMolstarViewer from "../molstar-viewer/molstar";

const GridItem = styled((props) => <Grid item {...props} />, {
  shouldForwardProp: (prop) => prop !== "position",
})(({ theme, position }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: position,
}));

const IndexButton = styled(({ index, toggled, handleClick, ...other }) => {
  return (
    <Button variant={toggled ? "contained" : "outlined"} onClick={handleClick} {...other}>
      {index + 1}
    </Button>
  );
})(({ theme }) => ({
  margin: theme.spacing(0.5, 0.5),
}));

export default function ProteinPage({ pdb_id, residue_count, type }) {
  const createFalseArray = (size) => new Array(size).fill(false);
  // Add 2 to length since insert adds two new elements
  const [insertIndices, setInsertIndices] = useState(createFalseArray(residue_count + 2));
  const [deleteIndices, setDeleteIndices] = useState(createFalseArray(residue_count));
  const [mode, setMode] = useState("insert");
  const [firstInsert, setFirstInsert] = useState("");
  const [secondInsert, setSecondInsert] = useState("");
  const [showMolstar, setShowMolstar] = useState(false);
  const [molstarViewer, setMolstarViewer] = useState();
  const molstarRef = useRef();
  const [mutant, setMutant] = useState();
  const navigate = useNavigate();

  // Abstraction based on mode selected so don't need ternary everywhere
  const indices = mode === "insert" ? insertIndices : deleteIndices;

  // Return indexes of all elements in array where element is truthy
  const getSelected = () => {
    const selected = [];
    indices.forEach((el, idx) => {
      el && selected.push(idx);
    });
    if (selected.length > 2) {
      console.error("Too many indices returned from getIndices");
    }
    return selected;
  };

  const getMutant = async () => {
    try {
      const selected = getSelected();
      const response = await axios.post(
        `http://localhost:8080/api/get-mutant`,
        {
          pdb_id,
          mode: mode === "insert" ? "ins" : "del",
          firstIndex: selected[0] + 1,
          secondIndex: selected[1] + 1,
          firstResidue: firstInsert,
          secondResidue: secondInsert,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // const viewer = await createMolstarViewer(molstarRef.current, response.data.pdb_data.pdb);
      // console.log(response.data);
      setMutant(response.data);
      // setMolstarViewer(viewer);
    } catch (error) {
      console.error(error);
      // TODO: Notify user
    }
  };

  useEffect(() => {
    const run = async () => {
      await createMolstarViewer(molstarRef.current, mutant.pdb_data.pdb);
    };
    run();
  }, [mutant]);

  // Count selected buttons (true is 1, false is 0 in js)
  const selectedCount = (() => {
    let count = 0;
    indices.forEach((toggled) => (count += toggled));
    return count;
  })();

  // Query for data from database, set aminoAcids

  const handleClear = () => {
    setInsertIndices(insertIndices.map(() => false));
    setDeleteIndices(deleteIndices.map(() => false));
    setFirstInsert("");
    setSecondInsert("");
    setShowMolstar(false);
  };

  const handleClick = (index) => () => {
    // TODO: Set conditional for single vs pairwise proteins for select limit
    // Flip boolean at specified index
    const toggleButton = (prevState) =>
      prevState.map((toggled, idx) => {
        if (index === idx) {
          // If toggling off
          if (toggled) {
            return !toggled;
            // If toggling on, check if there are already 2 selected
          } else if (selectedCount < 2) {
            return !toggled;
          } else {
            // Render notification indicating that cannot select more than 2 proteins
            return toggled;
          }
        } else {
          return toggled;
        }
      });
    mode === "insert" ? setInsertIndices(toggleButton) : setDeleteIndices(toggleButton);
  };

  const handleDropdownChange = (event) => {
    if (event.target.name === "first") {
      setFirstInsert(event.target.value);
    } else {
      setSecondInsert(event.target.value);
    }
  };

  const handleRadioChange = (event) => {
    setMode(event.target.value);
  };

  const handleApply = async () => {
    if (selectedCount === 2) {
      await getMutant();
    }
  };

  const showButton =
    selectedCount === 2 &&
    (mode === "delete" || firstInsert) &&
    (mode === "delete" || secondInsert);

  return (
    <Container sx={{ my: 6 }}>
      <Grid container>
        <GridItem xs position="start">
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button variant="contained" onClick={handleClear}>
            Clear
          </Button>
        </GridItem>
        <GridItem xs={8} position="center">
          <Typography variant="h4" gutterBottom>
            {pdb_id.toUpperCase()}
          </Typography>
          <RadioGroup
            value={mode}
            onChange={handleRadioChange}
            row
            sx={{ justifyContent: "center" }}>
            <FormControlLabel value="insert" control={<Radio />} label="Insert" sx={{ pr: 8 }} />
            <FormControlLabel value="delete" control={<Radio />} label="Delete" />
          </RadioGroup>
        </GridItem>
        <GridItem xs position="end">
          <Button variant="contained" disabled={!showButton}>
            Download
          </Button>
          <Button variant="contained" onClick={handleApply} disabled={!showButton}>
            Apply
          </Button>
        </GridItem>
      </Grid>
      {mode === "insert" && (
        <Box display="flex" flexDirection="column" alignItems="center">
          <AminoAcidDropdown name="first" value={firstInsert} handleChange={handleDropdownChange} />
          <AminoAcidDropdown
            name="second"
            value={secondInsert}
            handleChange={handleDropdownChange}
          />
        </Box>
      )}
      <Box display="flex" flexWrap="wrap" mt={3}>
        {(mode === "insert" ? insertIndices : deleteIndices).map((toggled, index) => (
          <IndexButton
            key={index}
            index={index}
            toggled={toggled}
            handleClick={handleClick(index)}
          />
        ))}
      </Box>
      {showMolstar && <Box mt={7}></Box>}
      <div ref={molstarRef} id="molstar"></div>
    </Container>
  );
}
