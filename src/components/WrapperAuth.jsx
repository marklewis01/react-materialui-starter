import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    marginTop: '56px',
    backgroundColor: '#f2f2f2',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      marginTop: '64px',
      marginLeft: '48px'
    }
  }
})

const WrapperAuth = ({ children, classes, theme }) => (
  <div className={classes.root}>{children}</div>
)

export default withStyles(styles, { withTheme: true })(WrapperAuth)
