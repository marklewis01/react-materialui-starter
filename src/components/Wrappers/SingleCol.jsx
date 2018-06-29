import React from 'react'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  root: {
    maxWidth: 1140,
    margin: `0 auto`
  }
})

const SingleCol = ({ children, classes }) => {
  return <div className={classes.root}>{children}</div>
}

export default withStyles(styles, { withTheme: true })(SingleCol)
