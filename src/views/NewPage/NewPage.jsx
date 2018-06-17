import React from 'react'
import { Subscribe } from 'unstated'
import SessionContainer from '../../containers/session'

import { Grid, Paper, Typography } from '@material-ui/core'

import withAuthorization from '../../components/Session/withAuthorization'

const NewPage = () => (
  <Subscribe to={[SessionContainer]}>
    {session => (
      <Paper>
        <Grid container>
          <Grid item>
            <h1>New Document Page:</h1>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography variant="body1">Some text here</Typography>
          </Grid>
        </Grid>
      </Paper>
    )}
  </Subscribe>
)

const authCondition = authUser => !!authUser // don't know if this is working with unstated

export default withAuthorization(authCondition)(NewPage)
