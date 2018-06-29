import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'unstated'
import { injectGlobal } from 'styled-components'

// MaterialUI
import { MuiThemeProvider } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { theme } from './customTheme'

// Components
import NavSide from './components/NavSide'
import NavTop from './components/NavTop'
import PrivateRoute from './components/PrivateRoute'
import LoginModal from './components/Login'
import { AuthWrapper, FlexCentered } from './components/Wrappers'

// auth + sessions
import { firebaseAuth } from './firebase'
import SessionContainer from './containers/session'

// Screens
import LandingPage from './screens/LandingPage'
import LoginPage from './screens/LoginPage'
import AccountPage from './screens/AccountPage'
import Dashboard from './screens/Dashboard'
import TodosPage from './screens/TodosPage'

injectGlobal`
  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  *, *::before, *::after {
    box-sizing: inherit;
  }
  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    font-size: 16px;
    margin-top: 64px;
    padding: 0;
  }
   a {
    text-decoration: none;
    color: #607d8b;
    font-weight: bold;
  }
`

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      authed: false,
      loading: true,
      loginModal: false
    }
  }

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        SessionContainer.signInUser(user).then(() => {
          this.setState({
            authed: true,
            loading: false
          })
        })
      } else {
        this.setState({
          authed: false,
          loading: false
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeListener()
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
    return this.state.loading === true ? (
      <MuiThemeProvider theme={theme}>
        <FlexCentered>
          <CircularProgress color="secondary" />
        </FlexCentered>
      </MuiThemeProvider>
    ) : (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Provider>
            <NavTop toggleModal={this.toggleLoginModal} />
            <NavSide />

            <Switch>
              <Route
                authed={this.state.authed}
                path="/login"
                component={LoginPage}
              />
              <Route path="/" exact component={LandingPage} />

              <PrivateRoute path="/account" component={AccountPage} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/todos" component={TodosPage} />
              <Route
                render={() => (
                  <AuthWrapper>
                    <h3>Something went wrong</h3>
                  </AuthWrapper>
                )}
              />
            </Switch>
            <LoginModal
              loginModal={this.state.loginModal}
              toggleLogin={this.toggleLoginModal}
              closeLogin={this.closeLoginModal}
            />
          </Provider>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default hot(module)(App)
