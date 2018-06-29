import React from 'react'
import { withRouter } from 'react-router-dom'
import { Subscribe } from 'unstated'

import { firebaseAuth } from '../../firebase'
import SessionContainer from '../../containers/session'
import * as routes from '../../routes'

const withAuthorization = authCondition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebaseAuth().onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.LANDING)
        }
      })
    }

    render() {
      return (
        <Subscribe to={[SessionContainer]}>
          {session => (session.state.authUser ? <Component /> : null)}
        </Subscribe>
      )
    }
  }

  return withRouter(WithAuthorization)
}

export default withAuthorization
