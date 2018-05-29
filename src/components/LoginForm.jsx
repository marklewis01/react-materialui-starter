import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'

import { auth } from '../firebase'
import * as routes from '../routes'

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
})

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email, password } = this.state
    const { history, closeLogin } = this.props

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
        history.push(routes.DASHBOARD)
        closeLogin()
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error))
      })

    event.preventDefault()
  }

  render() {
    const { loginModal, toggleLogin } = this.props
    const { email, password, error } = this.state
    const isInvalid = password === '' || email === ''

    return (
      <Dialog open={loginModal} onBackdropClick={toggleLogin}>
        <DialogTitle>Log in to your account</DialogTitle>
        <DialogContent>
          <form onSubmit={this.onSubmit}>
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              autoComplete="email"
              value={email}
              onChange={event =>
                this.setState(updateByPropertyName('email', event.target.value))
              }
            />
            <TextField
              fullWidth
              margin="dense"
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e =>
                this.setState(updateByPropertyName('password', e.target.value))
              }
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  this.onSubmit(e)
                  e.preventDefault()
                }
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleLogin} color="primary">
            Cancel
          </Button>
          <Button
            disabled={isInvalid}
            type="submit"
            color="primary"
            onClick={this.onSubmit}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const LoginWithRouter = withRouter(Login)

export default withMobileDialog()(LoginWithRouter)
