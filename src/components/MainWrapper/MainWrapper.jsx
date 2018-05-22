import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Container } from 'semantic-ui-react'
import 'react-toastify/dist/ReactToastify.css'

import routes from '../../constants/routes'

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
