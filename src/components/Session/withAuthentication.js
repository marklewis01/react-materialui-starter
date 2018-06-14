import React from 'react'

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
      return <Component />
    }
  }

  return WithAuthentication
}

export default withAuthentication
