import React, { useState } from "react";
import { Container, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import ProteinCard from "./ProteinCard";
import SearchIcon from "@mui/icons-material/Search";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const singleIndels = ["1l2y", "2nd8", "85ao", "9jn2"];
  const pairwiseIndels = ["n9m1", "n90a", "is61"];

  const filter = (string) => {
    // Use toLowerCase to make the search case-insensitive
    return string.toLowerCase().includes(search.toLowerCase());
  };

  const filteredSingle = singleIndels.filter(filter);
  const filteredPairwise = pairwiseIndels.filter(filter);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div data-testid="dashboard">
      <Container sx={{ my: 6, justifyContent: "flex-start" }}>
        <TextField
          value={search}
          onChange={handleChange}
          variant="outlined"
          placeholder="Search here"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          inputProps={{ "data-testid": "search-field" }}
          sx={{ width: 300, mb: 4 }}
        />
        <Typography variant="h4" component="h2" gutterBottom textAlign="left">
          Single Indel
        </Typography>
        <Grid container spacing={2} justifyContent="flex-start">
          {filteredSingle.map((protein) => (
            <Grid key={protein} item xs={4}>
              <ProteinCard name={protein} />
            </Grid>
          ))}
        </Grid>
        <Typography variant="h4" component="h2" gutterBottom textAlign="left" sx={{ mt: 4 }}>
          Pairwise Indel
        </Typography>
        <Grid container spacing={2} justifyContent="flex-start">
          {filteredPairwise.map((protein) => (
            <Grid key={protein} item xs={4}>
              <ProteinCard name={protein} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
