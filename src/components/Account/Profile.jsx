import React from "react";
import {
  Grid,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  withStyles
} from "@material-ui/core";

import { LastLogin } from "./index";
import { firebaseAuth, firebaseDb } from "../../firebase";

const styles = theme => ({
  gridItemFlex: {
    display: "flex"
  },
  gridItem: {
    paddingTop: 0
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  tabs: {
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    marginBottom: theme.spacing(3)
  },
  textField: {
    marginRight: theme.spacing(2),
    flexGrow: 1
  },
  textFieldShort: {
    width: `160px`,
    marginRight: theme.spacing(2)
  }
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.userId = firebaseAuth().currentUser.uid;
    this.colRef = firebaseDb()
      .collection("users")
      .doc(this.userId);
    this.unsubscribe = null;

    this.state = {
      email: "",
      givenName: "",
      familyName: "",
      lastLogin: "",
      profilePic: "",
      auditLog: [],
      loading: true
    };
  }

  componentDidMount() {
    this.colRef.get().then(doc => {
      if (doc.exists) {
        this.unsubscribe = this.colRef.onSnapshot(this.onCollectionUpdate);
      } else {
        this.colRef
          .set({ owner: this.userId })
          .then(() => {
            this.unsubscribe = this.colRef.onSnapshot(this.onCollectionUpdate);
          })
          .then(() =>
            this.colRef.update({
              email: firebaseAuth().currentUser.email
            })
          );
      }
    });

    const lastLogin = new Date(
      firebaseAuth().currentUser.metadata.lastSignInTime
    );
    this.setLastLogin(lastLogin);
  }

  onCollectionUpdate = doc => {
    this.setState({
      ...doc.data(),
      loading: false
    });
  };

  setLastLogin(lastLogin) {
    this.setState({
      lastLogin: lastLogin
    });
  }

  handleChange = name => event => {
    this.colRef.update({
      [name]: event.target.value
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { classes } = this.props;
    const { lastLogin } = this.state;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Typography variant="h2">Personal Information</Typography>
            <form>
              <Grid container spacing={2} justify="space-between">
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="givenName"
                    label="Given Name"
                    fullWidth
                    value={this.state.givenName}
                    onChange={this.handleChange("givenName")}
                    margin="normal"
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="familyName"
                    label="Family Name"
                    value={this.state.familyName}
                    onChange={this.handleChange("familyName")}
                    fullWidth
                    margin="normal"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="email"
                    label="Email Address"
                    value={this.state.email}
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                    disabled
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <Typography variant="h2">Profile Picture</Typography>
          </Paper>
          <Tabs value={false} className={classes.tabs}>
            <Tab label="Other Information" />
          </Tabs>
          <LastLogin lastLogin={lastLogin} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Profile);
