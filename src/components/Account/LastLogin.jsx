import React from 'react'
import { Typography } from '@material-ui/core'

export const LastLogin = ({ lastLogin }) => (
  <Typography variant="caption">
    Last Login:
    {lastLogin
      ? ` ${lastLogin.toDateString()} at ${lastLogin.toLocaleTimeString(
          'en-US'
        )}`
      : null}
  </Typography>
)
