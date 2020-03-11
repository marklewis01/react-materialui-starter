import React from "react";
import ReactDOM from "react-dom";

// Mui
import "typeface-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";

// styles
import theme from "./theme";

import App from "./App";

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
