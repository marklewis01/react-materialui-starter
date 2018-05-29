import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { withStyles } from '@material-ui/core/styles'

import AppBar from './AppBar'
import SideNav from './SideNav'

import Dashboard from './Dashboard'
import AccountPage from './Account'
import LandingPage from './Landing'
import RegisterPage from './Register'
import LoginPage from './Login'
import PasswordForgetPage from './PasswordForget'
import * as routes from '../routes'

const styles = theme => ({
  authenticated: {
    marginTop: '56px',
    minHeight: '100%',
    paddingLeft: '48px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '64px'
    }
  },
  public: {
    marginTop: '56px',
    minHeight: '100%',
    [theme.breakpoints.up('sm')]: {
      marginTop: '64px'
    }
  }
})

const Main = inject('sessionStore')(
  observer(({ classes, sessionStore }) => (
    <Router>
      <div
        className={
          sessionStore.authUser ? classes.authenticated : classes.public
        }
      >
        <AppBar />
        <SideNav />
        <Route exact path={routes.DASHBOARD} component={() => <Dashboard />} />
        <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
        <Route exact path={routes.LANDING} component={() => <LandingPage />} />
        <Route
          exact
          path={routes.REGISTER}
          component={() => <RegisterPage />}
        />
        <Route exact path={routes.LOGIN} component={() => <LoginPage />} />
        <Route
          exact
          path={routes.PASSWORD_FORGET}
          component={() => <PasswordForgetPage />}
        />
      </div>
    </Router>
  ))
)

export default withStyles(styles, { withTheme: true })(Main)
