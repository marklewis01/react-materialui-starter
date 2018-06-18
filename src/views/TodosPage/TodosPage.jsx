import React from 'react'
import { Subscribe } from 'unstated'

import { Paper, Typography, withStyles } from '@material-ui/core'

import SessionContainer from '../../containers/session'
import withAuthorization from '../../components/Session/withAuthorization'

import { AddTodoInput, Todos } from '../../components/Todos'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
})

const TodosPage = () => (
  <Subscribe to={[SessionContainer]}>
    {session => (
      <Paper>
        <Typography variant="display1">Task List:</Typography>
        <AddTodoInput />
        <hr />
        <Todos />
      </Paper>
    )}
  </Subscribe>
)

const authCondition = authUser => !!authUser // don't know if this is working with unstated

export default withAuthorization(authCondition)(
  withStyles(styles, { withTheme: true })(TodosPage)
)
