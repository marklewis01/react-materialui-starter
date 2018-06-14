import React from 'react'
import { Subscribe } from 'unstated'
import SessionContainer from '../../containers/session'

// import { PasswordForgetForm } from '../PasswordForget'
import PasswordChangeForm from '../PasswordChange'
import withAuthorization from '../Session/withAuthorization'

const AccountPage = () => (
  <Subscribe to={[SessionContainer]}>
    {session => (
      <div>
        <h1>Account: {session.state.authUser.email}</h1>
        {/* <PasswordForgetForm /> */}
        <PasswordChangeForm />
      </div>
    )}
  </Subscribe>
)

const authCondition = authUser => !!authUser // don't know if this is working with unstated

export default withAuthorization(authCondition)(AccountPage)
