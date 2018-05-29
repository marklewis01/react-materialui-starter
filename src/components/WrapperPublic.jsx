import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    marginTop: '56px',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      marginTop: '64px'
    }
  }
})

const WrapperPublic = ({ children, classes, theme }) => (
  <div className={classes.root}>{children}</div>
)

export default withStyles(styles, { withTheme: true })(WrapperPublic)
