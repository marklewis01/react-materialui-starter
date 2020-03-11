import { createMuiTheme } from "@material-ui/core/styles";
import deepOrange from "@material-ui/core/colors/deepOrange";
import blueGrey from "@material-ui/core/colors/blueGrey";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: deepOrange
  }
});

// tweak theme shadows
theme.shadows[2] =
  "0px 1px 8px 0px rgba(0, 0, 0, 0.07), 0 1px 2px 0px rgba(0, 0, 0, 0.15)";

export default theme;
