import React from 'react'
import { Subscribe } from 'unstated'
import SessionContainer from '../containers/session'

import { Avatar, Grid, Paper, Typography } from '@material-ui/core'

// import { PasswordForgetForm } from '../PasswordForget'
import PasswordChangeForm from '../components/PasswordChange'
import withAuthorization from '../components/Session/withAuthorization'

import avatarImg from '../assets/img/uxceo-128.jpg'

class AccountPage extends React.Component {
  render() {
    return (
      <Subscribe to={[SessionContainer]}>
        {session => (
          <Paper>
            <Grid container>
              <Grid item>
                <Avatar
                  alt="Adelle Charles"
                  src={avatarImg}
                  // className={classNames(classes.avatar, classes.bigAvatar)}
                />
              </Grid>
              <Grid item>
                <Typography>{session.state.authUser.email}</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <h1>New Account Page: {session.state.authUser.email}</h1>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item>
                <PasswordChangeForm />
              </Grid>
            </Grid>
          </Paper>
        )}
      </Subscribe>
    )
  }
}

const authCondition = authUser => !!authUser // don't know if this is working with unstated

export default withAuthorization(authCondition)(AccountPage)
