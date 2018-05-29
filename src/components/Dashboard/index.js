import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'

import withAuthorization from '../Session/withAuthorization'
import { db } from '../../firebase'

class Dashboard extends Component {
  componentDidMount() {
    const { userStore } = this.props

    db.onceGetUsers().then(snapshot => userStore.setUsers(snapshot.val()))
  }

  render() {
    const { users } = this.props.userStore

    return (
      <div>
        <h1>Dashboard</h1>
        <p>The Dashbord is accessible by every signed in user.</p>
      </div>
    )
  }
}

const UserList = ({ users }) => (
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key => <div key={key}>{users[key].username}</div>)}
  </div>
)

const authCondition = authUser => Boolean(authUser)

export default compose(
  withAuthorization(authCondition),
  inject('userStore'),
  observer
)(Dashboard)
