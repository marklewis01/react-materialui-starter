import React from 'react'
import { Subscribe } from 'unstated'

import { firebase } from '../../firebase'
import SessionContainer from '../../containers/session'

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? SessionContainer.setAuthUser(authUser)
          : SessionContainer.setAuthUser(null)
      })
    }

    render() {
      return (
        <Subscribe to={[SessionContainer]}>
          {session => <Component authUser={session.state.authUser} />}
        </Subscribe>
      )
    }
  }

  return WithAuthentication
}

export default withAuthentication
