import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Page from '../Page'
import DetailsPanel from '../DetailsPanel'
import MinorPanel from '../MinorPanel'
import MajorPanel from '../MajorPanel'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginLeft: 'unset',
    marginRight: 'unset',
    marginTop: '56px',
    backgroundColor: '#f2f2f2',
    [theme.breakpoints.up('md')]: {
      marginLeft: '48px',
      marginRight: '0',
      marginTop: '64px',
      minHeight: 'calc(100vh - 64px)'
    }
  },
  paper: {
    backgroundColor: '#fff',
    minHeight: '200px'
  }
})

class Main extends Component {
  render() {
    const { classes, theme } = this.props
    return (
      <Grid container className={classes.root} spacing={32}>
        <MajorPanel>
          <Page />
        </MajorPanel>
        <MinorPanel>
          <DetailsPanel />
        </MinorPanel>
      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Main)
