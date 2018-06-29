import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Subscribe } from 'unstated'

import SessionContainer from '../../containers/session'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Subscribe to={[SessionContainer]}>
    {session => {
      return (
        <Route
          {...rest}
          render={props =>
            session.state.authUser ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      )
    }}
  </Subscribe>
)

export default PrivateRoute
