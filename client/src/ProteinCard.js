import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

// A card on the home screen detailing a single protein, and basic details
// When clicked, it should navigate to the heatmap visualizer
function ProteinCard({ protein }) {
  return (
    <Card data-testid="protein-card">
      <CardActionArea component={RouterLink} to={`${protein.pdb_id}/${protein.type}`}>
        <CardContent>
          <Typography variant="h5" component="div">
            {protein.pdb_id}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProteinCard;
