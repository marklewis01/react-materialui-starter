import React from 'react'
import { Subscribe } from 'unstated'

import { firebaseAuth } from '../../firebase'
import SessionContainer from '../../containers/session'

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      firebaseAuth().onAuthStateChanged(authUser => {
        if (authUser) {
          SessionContainer.setAuthUser(authUser)
        }
      })
    }

    render() {
      return (
        <Subscribe to={[SessionContainer]}>
          {session => (
            <Component authUser={session.state.authUser} {...this.props} />
          )}
        </Subscribe>
      )
    }
  }

  return WithAuthentication
}

export default withAuthentication
