import React, { Fragment } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'

import Loading from '../Loading'
import MainWrapper from '../MainWrapper'
import SideNav from '../SideNav'

import * as stores from '../../stores'

import './App.css'

const App = () => (
  <Provider {...stores}>
    <Router>
      <Fragment>
        <Loading />
        <SideNav />
        <MainWrapper />
      </Fragment>
    </Router>
  </Provider>
)

export default App
