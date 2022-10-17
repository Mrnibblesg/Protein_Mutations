import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink} from "react-router-dom";

// A card on the home screen detailing a single protein, and basic details
// When clicked, it should navigate to the heatmap visualizer
function ProteinCard({ name }) {
  return (
    <Card data-testid="protein-card">
      <CardActionArea component={RouterLink} to={name}>
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProteinCard;
