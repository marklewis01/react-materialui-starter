import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
// import DevTools from 'mobx-react-devtools'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import AppBar from '../AppBar'
import Main from '../Main'
import SideNav from '../SideNav'

import * as stores from '../../stores'

// import './App.css'

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    position: 'relative',
    display: 'flex'
  }
})

const App = ({ classes, theme }) => (
  <Provider {...stores}>
    <Router>
      <div className={classes.root}>
        {/* <DevTools /> */}
        <CssBaseline />
        <AppBar />
        <SideNav />
        <Main />
      </div>
    </Router>
  </Provider>
)

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(App)
