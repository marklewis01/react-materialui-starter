import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { withAuthentication } from '../Session'
import Main from '../Main'
import { theme } from '../../customTheme'

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Main />
  </MuiThemeProvider>
)

export default withAuthentication(App)
