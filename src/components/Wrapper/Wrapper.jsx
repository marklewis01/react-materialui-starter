import React from 'react'
import { inject, observer } from 'mobx-react'

import { withStyles } from '@material-ui/core/styles'

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

const Wrapper = inject('sessionStore')(
  observer(({ children, classes, sessionStore, theme }) => (
    <div
      className={sessionStore.authUser ? classes.authenticated : classes.public}
    >
      {children}
    </div>
  ))
)

export default withStyles(styles, { withTheme: true })(Wrapper)
