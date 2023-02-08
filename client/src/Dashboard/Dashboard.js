import React, { useState } from "react";
import { Container, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import ProteinCard from "./ProteinCard";
import SearchIcon from "@mui/icons-material/Search";

export default function Dashboard({ proteins }) {
  const [search, setSearch] = useState("");

  const searchFilter = (protein) => {
    // Use toLowerCase to make the search case-insensitive
    return protein.pdb_id.toLowerCase().includes(search.toLowerCase());
  };

  // const filteredSingle = singleIndels.filter(searchFilter);
  // const filteredPairwise = pairwiseIndels.filter(searchFilter);
  const filteredProteins = proteins.filter(searchFilter);

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
          Single InDel
        </Typography>
        <Grid container spacing={2} justifyContent="flex-start">
          {filteredProteins
            .filter((protein) => protein.type === "single")
            .map((protein) => (
              <Grid key={protein._id} item xs={4}>
                <ProteinCard protein={protein} />
              </Grid>
            ))}
        </Grid>
        <Typography variant="h4" component="h2" gutterBottom textAlign="left" sx={{ mt: 4 }}>
          Pairwise InDels
        </Typography>
        <Grid container spacing={2} justifyContent="flex-start">
          {filteredProteins
            .filter((protein) => protein.type === "pairwise")
            .map((protein) => (
              <Grid key={protein._id} item xs={4}>
                <ProteinCard protein={protein} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  );
}
