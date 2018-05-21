import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Container } from 'semantic-ui-react'

import Dashboard from '../Dashboard'
import Settings from '../Settings'
import List from '../../components/List'

import 'react-toastify/dist/ReactToastify.css'

const Help = () => (
  <div>
    <h1>The Help Page</h1>
  </div>
)

const routes = [
  {
    path: '/',
    exact: true,
    component: Dashboard
  },
  {
    path: '/list',
    component: List
  },
  {
    path: '/help',
    component: Help
  },
  {
    path: '/settings',
    component: Settings
  }
]

class MainWrapper extends Component {
  render() {
    return (
      <Container className="main-wrapper">
        <ToastContainer />

        {routes.map(({ path, exact, component: C }) => (
          <Route key={path} exact={exact} path={path} render={props => <C />} />
        ))}
      </Container>
    )
  }
}

export default MainWrapper
