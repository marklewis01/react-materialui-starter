import React from 'react'

import { Subscribe } from 'unstated'
import { withStyles } from '@material-ui/core/styles'

import SessionContainer from '../../containers/session'

const styles = theme => ({
  authenticated: {
    marginTop: '56px',
    height: '100%',
    paddingLeft: '48px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '64px'
    }
  },
  public: {
    marginTop: '56px',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      marginTop: '64px'
    }
  }
})

const Wrapper = ({ children, classes, theme }) => (
  <Subscribe to={[SessionContainer]}>
    {session => (
      <div
        className={
          session.state.authUser ? classes.authenticated : classes.public
        }
      >
        {children}
      </div>
    )}
  </Subscribe>
)

export default withStyles(styles, { withTheme: true })(Wrapper)
