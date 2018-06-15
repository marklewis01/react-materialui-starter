import React, { Fragment } from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'

import { withAuthentication } from '../Session'
import Main from '../Main'

const App = () => (
  <Fragment>
    <CssBaseline />
    <Main />
  </Fragment>
)

export default withAuthentication(App)
