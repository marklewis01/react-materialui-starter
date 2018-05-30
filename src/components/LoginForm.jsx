import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import green from '@material-ui/core/colors/green'
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

const styles = theme => ({
  root: {
    justifyContent: 'space-between'
  },
  btnWrapper: {
    display: 'flex'
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative'
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
})

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value
})

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  loading: false,
  success: false
}

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  onSubmit = event => {
    const { email, password } = this.state
    const { history, closeLogin } = this.props

    // 1: check state
    if (!this.state.loading) {
      this.setState(
        {
          loading: true,
          success: false
        },
        () => {
          auth
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
              this.timer = setTimeout(() => {
                this.setState({
                  ...INITIAL_STATE,
                  success: true
                })
              }, 2000)
              history.push(routes.DASHBOARD)
              closeLogin()
            })
            .catch(error => {
              this.setState(updateByPropertyName('error', error))
            })
        }
      )
    }
    event.preventDefault()
  }

  onCloseModal = () => {
    this.props.toggleLogin()
    this.setState(() => ({ ...INITIAL_STATE }))
  }

  timer = undefined

  render() {
    const { classes, loginModal, toggleLogin } = this.props
    const { email, loading, password, success, error } = this.state
    const isInvalid = password === '' || email === ''

    return (
      <Dialog open={loginModal} onBackdropClick={this.onCloseModal}>
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
              disabled={loading}
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
              disabled={loading}
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
        <DialogActions className={classes.root}>
          <Button onClick={this.onCloseModal} disabled={loading}>
            Register
          </Button>
          <div className={classes.btnWrapper}>
            <div className={classes.wrapper}>
              <Button onClick={this.onCloseModal} disabled={loading}>
                Cancel
              </Button>
            </div>
            <div className={classes.wrapper}>
              <Button
                variant="raised"
                color="primary"
                className={classes.buttonSuccess}
                disabled={loading}
                type="submit"
                onClick={this.onSubmit}
              >
                Login
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </div>
        </DialogActions>
      </Dialog>
    )
  }
}

const LoginWithRouter = withRouter(Login)
const StyledLogin = withStyles(styles, { withTheme: true })(LoginWithRouter)

export default withMobileDialog()(StyledLogin)
