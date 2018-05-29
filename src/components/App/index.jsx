import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { observer } from 'mobx-react'

import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import AppBar from '../AppBar'
import SideNav from '../SideNav'
// import Wrapper from '../Wrapper'
import withAuthentication from '../Session/withAuthentication'

import Main from '../Main'

import Dashboard from '../Dashboard'
import AccountPage from '../Account'
import LandingPage from '../Landing'
import RegisterPage from '../Register'
import LoginPage from '../Login'
import PasswordForgetPage from '../PasswordForget'
import * as routes from '../../routes'

const App = observer(() => (
  <div>
    <CssBaseline />
    <Main />
  </div>
))

export default withAuthentication(App)
