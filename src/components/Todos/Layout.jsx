import React from "react";

import { Grid, Paper, Typography, withStyles } from "@material-ui/core";

import { AddTodoInput, Todos } from "./index";

const styles = () => ({
  root: {
    padding: `1rem`
  }
});

const Layout = ({ classes }) => (
  <div>
    <Grid container style={{ marginBottom: `1rem` }}>
      <Grid item md={8}>
        <Typography variant="h2">
          Todo List (with Firestore Persistence)
        </Typography>
        <Typography>
          Very basic todo list and my first real component performing CRUD
          operations with the Firestore database. Access-control is maintained
          through Firestore rules run server-side.
        </Typography>
      </Grid>
    </Grid>
    <Grid container spacing={2}>
      <Grid item sm={4}>
        <Paper>
          <Grid item className={classes.root}>
            <Typography variant="h3">Task List:</Typography>
            <AddTodoInput />
          </Grid>
          <Grid>
            <Todos />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </div>
);

export default withStyles(styles)(Layout);
