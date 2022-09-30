import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const NavButton = styled(({ link, ...other }) => <Button component={Link} to={link} {...other} />)(
  ({ theme }) => ({
    color: "white",
    textTransform: "none",
    ...theme.typography.h4,
    padding: theme.spacing(0, 5),
  })
);

export default function NavBar() {
  return (
    <>
      <AppBar position="relative">
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h3" component="h1">
            Protein Mutations
          </Typography>
          <Box display="flex">
            <NavButton color="primary" link="/">
              Dashboard
            </NavButton>
            <NavButton link="info">Info</NavButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}
