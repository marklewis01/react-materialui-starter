import { createStyles, Theme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

export const styles = (theme: Theme) =>
  createStyles({
    buttonSuccess: {
      backgroundColor: green[500],
      marginTop: "1rem",
      marginBottom: "1.5rem",
      "&:hover": {
        backgroundColor: green[700]
      }
    },
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12
    },
    link: {
      cursor: "pointer"
    },
    paper: {
      [theme.breakpoints.up("sm")]: {
        width: "400px"
      }
    },
    register: {
      marginTop: "1rem"
    }
  });
