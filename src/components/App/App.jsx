import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'

import { withAuthentication } from '../Session'
import Main from '../Main'

const App = () => (
  <div>
    <CssBaseline />
    <Main />
  </div>
)

export default withAuthentication(App)
