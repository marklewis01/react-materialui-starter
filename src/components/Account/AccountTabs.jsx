import React, { Component } from "react";
import { Tab, Tabs, withStyles } from "@material-ui/core";

import { Organisation, Profile } from "./index";

const styles = theme => ({
  tabs: {
    borderBottom: `1px solid ${theme.palette.primary.light}`,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2)
  }
});

class AccountTabs extends Component {
  state = {
    tabValue: 0
  };

  handleTabChange = (e, value) => {
    this.setState({ tabValue: value });
  };

  render() {
    const { classes } = this.props;
    const { tabValue } = this.state;

    return (
      <div>
        <Tabs
          value={tabValue}
          onChange={this.handleTabChange}
          className={classes.tabs}
          indicatorColor="primary"
        >
          <Tab label="Profile" />
          <Tab label="Organisation" />
        </Tabs>
        {tabValue === 0 && <Profile />}
        {tabValue === 1 && <Organisation />}
      </div>
    );
  }
}

export default withStyles(styles)(AccountTabs);
