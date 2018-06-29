import React from 'react'

import { AuthWrapper, SingleCol } from '../components/Wrappers'
import { AccountTabs, Banner } from '../components/Account'

const Account = ({ authUser }) => {
  return (
    <AuthWrapper authUser>
      <SingleCol>
        <h1>Account Page</h1>
        <Banner />
        <AccountTabs />
      </SingleCol>
    </AuthWrapper>
  )
}

export default Account
