import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  paper: {
    minHeight: '200px' // can delete this prop after dev. just placeholding
  }
})

const MajorPanel = ({ children, classes, theme }) => {
  return (
    <Grid item xs={12} sm={7}>
      <Paper className={classes.paper}>{children}</Paper>
    </Grid>
  )
}

export default withStyles(styles, { withTheme: true })(MajorPanel)
