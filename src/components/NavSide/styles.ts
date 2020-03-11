import { createStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 240;

export const styles = (theme: Theme) =>
  createStyles({
    list: {
      width: 250
    },
    link: {
      cursor: "pointer"
    },
    fullList: {
      width: "auto"
    },
    drawerPaper: {
      position: "fixed",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      whiteSpace: "nowrap",
      width: drawerWidth,
      zIndex: 1000
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9)
      }
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px"
    }
  });
