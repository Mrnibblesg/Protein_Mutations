import React, { useState, useEffect } from "react";
import { Container, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import ProteinCard from "./ProteinCard";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [singleIndels, setSingleIndels] = useState([]);
  const pairwiseIndels = [{ name: "n9m1" }, { name: "n90a" }, { name: "is61" }];

  // Retrieve data from database
  useEffect(() => {
    const getProteinNames = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/protein-names");
        setSingleIndels(response.data);
      } catch (error) {
        console.error(error);
        // Notify the user somehow
      }
    };

    getProteinNames();
  }, []);

  const filter = (protein) => {
    // Use toLowerCase to make the search case-insensitive
    return protein.name.toLowerCase().includes(search.toLowerCase());
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
          Single InDel
        </Typography>
        <Grid container spacing={2} justifyContent="flex-start">
          {filteredSingle.map((protein) => (
            <Grid key={protein.name} item xs={4}>
              <ProteinCard name={protein.name} />
            </Grid>
          ))}
        </Grid>
        <Typography variant="h4" component="h2" gutterBottom textAlign="left" sx={{ mt: 4 }}>
          Pairwise InDel
        </Typography>
        <Grid container spacing={2} justifyContent="flex-start">
          {filteredPairwise.map((protein) => (
            <Grid key={protein.name} item xs={4}>
              <ProteinCard name={protein.name} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
