import React from 'react'

import { Paper, Typography } from '@material-ui/core'

import { AuthWrapper, SingleCol } from '../components/Wrappers'
import { AddTodoInput, Todos } from '../components/Todos'

const TodosPage = ({ authUser }) => (
  <AuthWrapper authUser>
    <SingleCol>
      <Paper>
        <Typography variant="display1">Task List:</Typography>
        <AddTodoInput />
        <Todos />
      </Paper>
    </SingleCol>
  </AuthWrapper>
)

export default TodosPage
