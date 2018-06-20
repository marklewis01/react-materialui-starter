import React, { Fragment } from 'react'
import { Subscribe } from 'unstated'

import SessionContainer from '../../containers/session'
import withAuthorization from '../../components/Session/withAuthorization'

import { AccountTabs, Banner } from '../../components/Account'

const AccountPage = () => (
  <div className="test">
    <Banner />
    <AccountTabs />
  </div>
)

const authCondition = authUser => !!authUser // don't know if this is working with unstated

export default withAuthorization(authCondition)(AccountPage)
