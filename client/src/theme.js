import { createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

// We can use this to change default colors when we decide on a color scheme
const theme = createTheme({
  palette: {
    primary: purple[500],
  },
});

export default theme;
