import React from 'react'

import { AuthWrapper, SingleCol } from '../components/Wrappers'

const LandingPage = () => (
  <AuthWrapper authUser>
    <SingleCol>
      <h1>Landing</h1>
      <p>
        The Landing Page is open to everyone, even though the user isn't signed
        in.
      </p>
    </SingleCol>
  </AuthWrapper>
)

export default LandingPage
