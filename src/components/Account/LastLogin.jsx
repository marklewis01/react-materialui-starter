import React from 'react'
import { Typography } from '@material-ui/core'

import { firebaseAuth } from '../../firebase'

const LastLogin = () => {
  this.lastLogin = new Date(firebaseAuth().currentUser.metadata.lastSignInTime)

  return (
    <Typography variant="caption">
      Last Login:{' '}
      {`${this.lastLogin.toDateString()} at ${this.lastLogin.toLocaleTimeString(
        'en-US'
      )}`}
    </Typography>
  )
}

export default LastLogin
