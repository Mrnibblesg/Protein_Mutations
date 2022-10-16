import React, { useState } from "react";
import styled from "@emotion/styled";
import { Box, Button, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";

const GridItem = styled((props) => <Grid item {...props} />)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
}));

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

export default function ProteinPage({ id }) {
  const [aminoAcids, setAminoAcids] = useState(() => {
    const acidBools = {};
    aminoAcidList.forEach((letter) => {
      acidBools[letter] = false;
    });
    return acidBools;
  });

  // Query for data from database, set aminoAcids

  const selectAminoAcid = (letter) => {};

  return (
    <Box my={6}>
      <Grid container>
        <GridItem xs>
          <Button variant="outlined">Back</Button>
          <Button variant="contained" disabled>
            Clear
          </Button>
        </GridItem>
        <GridItem xs={8}>
          <Typography variant="h4" gutterBottom>
            Protein Name
          </Typography>
          <RadioGroup row sx={{ justifyContent: "center" }}>
            <FormControlLabel value="insert" control={<Radio />} label="Insert" sx={{ pr: 8 }} />
            <FormControlLabel value="delete" control={<Radio />} label="Delete" />
          </RadioGroup>
        </GridItem>
        <GridItem xs>
          <Button variant="contained" disabled>
            Download
          </Button>
          <Button variant="contained">Apply</Button>
        </GridItem>
      </Grid>
      <Box></Box>
    </Box>
  );
}
