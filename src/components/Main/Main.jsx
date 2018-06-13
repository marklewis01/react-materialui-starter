import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { withStyles } from '@material-ui/core/styles'

import TopNav from '../TopNav'
import SideNav from '../SideNav'
import Dashboard from '../Dashboard'
import AccountPage from '../Account'
import LandingPage from '../Landing'
// import RegisterPage from '../Register'
import LoginModal from '../Login'
// import PasswordForgetPage from '../PasswordForget'
import * as routes from '../../routes'

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
  observer(
    class ObserverMain extends React.Component {
      constructor(props) {
        super(props)

        this.state = {
          loginModal: false
        }
      }

      toggleLoginModal = () => {
        const loginModal = !this.state.loginModal
        this.setState({
          loginModal: loginModal
        })
      }

      closeLoginModal = () => {
        this.setState({
          loginModal: false
        })
      }

      render() {
        const { classes, sessionStore } = this.props
        return (
          <Router>
            <div
              className={
                sessionStore.authUser ? classes.authenticated : classes.public
              }
            >
              <TopNav toggleModal={this.toggleLoginModal} />
              <SideNav />
              <Route path={routes.DASHBOARD} component={() => <Dashboard />} />
              <Route path={routes.ACCOUNT} component={() => <AccountPage />} />
              <Route
                exact
                path={routes.LANDING}
                component={() => <LandingPage />}
              />
              <LoginModal
                loginModal={this.state.loginModal}
                toggleLogin={this.toggleLoginModal}
                closeLogin={this.closeLoginModal}
              />
            </div>
          </Router>
        )
      }
    }
  )
)

export default withStyles(styles, { withTheme: true })(Main)
