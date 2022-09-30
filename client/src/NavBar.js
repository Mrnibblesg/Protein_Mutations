import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";

export default function NavBar() {
  return (
    <AppBar>
      <Toolbar style={{ justifyContent: "space-around" }}>
        <Typography variant="h3" component="h1">
          Protein Mutations
        </Typography>
        {/* <Box display="flex"> */}
        <Button color="secondary">Dashboard</Button>
        <Typography variant="h4" component="h3">
          <Button>Info</Button>
        </Typography>
        {/* </Box> */}
      </Toolbar>
    </AppBar>
  );
}
