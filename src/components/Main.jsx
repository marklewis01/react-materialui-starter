import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
})

class Main extends Component {
  render() {
    const { classes, theme } = this.props
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography noWrap>
          {'You think water moves fast? You should see ice.'}
        </Typography>
      </main>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Main)
