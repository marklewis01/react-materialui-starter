import React from 'react'

import { Grid, Paper, Typography, withStyles } from '@material-ui/core'

import { AuthWrapper, SingleCol } from '../components/Wrappers'
import { AddTodoInput, Todos } from '../components/Todos'

const styles = () => ({
  root: {
    padding: `1rem`
  }
})

const TodosPage = ({ authUser, classes }) => (
  <AuthWrapper authUser>
    <SingleCol>
      <Grid container>
        <Paper>
          <Grid item className={classes.root}>
            <Typography variant="display1">Task List:</Typography>
            <AddTodoInput />
          </Grid>
          <Grid>
            <Todos />
          </Grid>
        </Paper>
      </Grid>
    </SingleCol>
  </AuthWrapper>
)

export default withStyles(styles)(TodosPage)
