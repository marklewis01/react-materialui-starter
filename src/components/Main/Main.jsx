import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Subscribe } from 'unstated'

import { withStyles } from '@material-ui/core/styles'

import TopNav from '../TopNav'
import SideNav from '../SideNav'
import SpeedDial from '../SpeedDial'
import Dashboard from '../../views/Dashboard'
import AccountPage from '../../views/Account'
import LandingPage from '../Landing'
import NewPage from '../../views/NewPage'
import LoginModal from '../Login'

import SessionContainer from '../../containers/session'
import * as routes from '../../routes'

const styles = theme => ({
  authenticated: {
    marginTop: '56px',
    minHeight: '100%',
    padding: '.5rem',
    [theme.breakpoints.up('sm')]: {
      marginTop: '64px'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing.unit * 8,
      padding: '1rem'
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

class Main extends React.Component {
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
    const { classes } = this.props
    return (
      <Router>
        <Subscribe to={[SessionContainer]}>
          {session => (
            <div
              className={
                session.state.authUser ? classes.authenticated : classes.public
              }
            >
              <TopNav toggleModal={this.toggleLoginModal} />
              {/* <SideNav /> */}
              <SpeedDial />
              <Route path={routes.ACCOUNT} component={() => <AccountPage />} />
              <Route path={routes.DASHBOARD} component={() => <Dashboard />} />
              <Route
                exact
                path={routes.LANDING}
                component={() => <LandingPage />}
              />
              <Route path={routes.NEWDOC} component={() => <NewPage />} />
              <LoginModal
                loginModal={this.state.loginModal}
                toggleLogin={this.toggleLoginModal}
                closeLogin={this.closeLoginModal}
              />
            </div>
          )}
        </Subscribe>
      </Router>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Main)
