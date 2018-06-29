import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { withAuthentication } from './components/Session'
import Main from './components/Main'
import { theme } from './customTheme'

// auth + sessions
// import { PrivateRoute } from './session/PrivateRoute'
import { firebaseAuth } from './firebase'
import SessionContainer from './containers/session'

class App extends React.Component {
  state = {
    authed: false,
    loading: true
  }

  componentDidMount() {
    this.removeListener = firebaseAuth().onAuthStateChanged(user => {
      if (user) {
        SessionContainer.setAuthUser(user).then(() => {
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

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Main />
      </MuiThemeProvider>
    )
  }
}

export default withAuthentication(App)
