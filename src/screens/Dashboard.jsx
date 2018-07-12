import React from 'react'
import { Subscribe } from 'unstated'

import SessionContainer from '../containers/session'
import { AuthWrapper, SingleCol } from '../components/Wrappers'
import AnonymousMsg from '../components/AnonymousMsg'

const Home = () => (
  <AuthWrapper>
    <SingleCol>
      <Subscribe to={[SessionContainer]}>
        {session => (
          <div>
            <h1>Welcome to the Dashboard!</h1>
            <p>The Dashboard is accessible by every signed in user.</p>
            {session.state.authUser.isAnonymous ? <AnonymousMsg /> : null}
          </div>
        )}
      </Subscribe>
    </SingleCol>
  </AuthWrapper>
)

export default Home
