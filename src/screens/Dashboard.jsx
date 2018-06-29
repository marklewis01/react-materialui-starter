import React from 'react'
import { Subscribe } from 'unstated'

import SessionContainer from '../containers/session'
import ImageUpload from '../components/ImageUpload'
import { AuthWrapper, SingleCol } from '../components/Wrappers'

const Home = () => (
  <AuthWrapper>
    <SingleCol>
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
    </SingleCol>
  </AuthWrapper>
)

export default Home
