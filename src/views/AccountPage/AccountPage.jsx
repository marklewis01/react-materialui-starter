import React, { Fragment } from 'react'
import { Subscribe } from 'unstated'

import SessionContainer from '../../containers/session'
import withAuthorization from '../../components/Session/withAuthorization'

import { AccountTabs, Banner } from '../../components/Account'

const AccountPage = () => (
  <Subscribe to={[SessionContainer]}>
    {session => (
      <Fragment>
        <Banner />
        <AccountTabs />
      </Fragment>
    )}
  </Subscribe>
)

const authCondition = authUser => !!authUser // don't know if this is working with unstated

export default withAuthorization(authCondition)(AccountPage)
