import React from 'react'
import { observer } from 'mobx-react'

import CssBaseline from '@material-ui/core/CssBaseline'

import withAuthentication from '../Session/withAuthentication'
import Main from '../Main'

const App = observer(() => (
  <div>
    <CssBaseline />
    <Main />
  </div>
))

export default withAuthentication(App)
