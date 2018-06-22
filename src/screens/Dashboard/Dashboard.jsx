import React, { Component } from 'react'
import { Subscribe } from 'unstated'

import { withAuthorization } from '../../components/Session'
import SessionContainer from '../../containers/session'

import ImageUpload from '../../components/ImageUpload'

class Dashboard extends Component {
  render() {
    return (
      <Subscribe to={[SessionContainer]}>
        {session => (
          <div>
            <h1>Welcome to the New Dashboard!</h1>
            <p>The Dashbord is accessible by every signed in user.</p>
            <p>{session.state.authUser.email}</p>
            <ImageUpload />
          </div>
        )}
      </Subscribe>
    )
  }
}

const authCondition = authUser => Boolean(authUser) // don't know if this is working with unstated

export default withAuthorization(authCondition)(Dashboard)