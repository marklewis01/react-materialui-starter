import React from 'react'
import { withStyles } from '@material-ui/core'
import { Subscribe } from 'unstated'

import SessionContainer from '../../containers/session'

const styles = theme => ({
  login: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 72px)',
    paddingBottom: '8rem'
  },
  signedIn: {
    marginLeft: 72,
    padding: `1rem`,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'unset'
    }
  }
})

const AuthWrapper = ({ children, classes }) => {
  return (
    <Subscribe to={[SessionContainer]}>
      {session => {
        if (session.state.authUser !== null) {
          return <div className={classes.signedIn}>{children}</div>
        } else {
          return <div className={classes.login}>{children}</div>
        }
      }}
    </Subscribe>
  )
}

export default withStyles(styles, { withTheme: true })(AuthWrapper)
