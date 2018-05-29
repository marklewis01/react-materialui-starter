import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'

import AppBar from '../AppBar'
import LandingPage from '../Landing'
import LoginPage from '../Login'
// import Navigation from '../Navigation'
import RegisterPage from '../Register'
import SideNav from '../SideNav'
import PasswordForgetPage from '../PasswordForget'
import HomePage from '../Home'
import AccountPage from '../Account'
import WrapperPublic from '../WrapperPublic'
import withAuthentication from '../Session/withAuthentication'
import * as routes from '../../constants/routes'

import CssBaseline from '@material-ui/core/CssBaseline'
// import './index.css'

const styles = theme => ({
  app: {
    height: `calc(100vh - 56px)`,
    [theme.breakpoints.up('sm')]: {
      height: `calc(100vh - 64px)`
    }
  }
})

const App = ({ classes }) => (
  <Router>
    <div className={classes.app}>
      <CssBaseline />
      <AppBar />
      <SideNav />
      <WrapperPublic>
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
      </WrapperPublic>
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
    </div>
  </Router>
)

const StyledApp = withStyles(styles, { withTheme: true })(App)

export default withAuthentication(StyledApp)
