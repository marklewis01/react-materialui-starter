import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

import withAuthorization from '../Session/withAuthorization'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <p>The Dashbord is accessible by every signed in user.</p>
      </div>
    )
  }
}

const authCondition = authUser => Boolean(authUser)

export default compose(
  withAuthorization(authCondition),
  inject('userStore'),
  observer
)(Dashboard)
