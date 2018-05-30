import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import green from '@material-ui/core/colors/green'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
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
  },
  link: {
    textAlign: 'right',
    marginTop: '1rem',
    marginBottom: '1rem',
    textDecoration: 'none'
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
      <Dialog
        open={loginModal}
        onBackdropClick={this.onCloseModal}
        aria-labelledby="log-in-form"
      >
        <DialogTitle id="log-in-form">Log in to your account</DialogTitle>
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

            <Typography
              variant="caption"
              className={classes.link}
              color="primary"
            >
              <Link
                to={routes.PASSWORD_FORGET}
                className={classes.link}
                disabled={loading}
              >
                Forgot your password?
              </Link>
            </Typography>
            <div>
              <Button
                fullWidth={true}
                variant="raised"
                color="primary"
                className={classes.buttonSuccess}
                disabled={loading || isInvalid}
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
          </form>
        </DialogContent>
        <DialogContent>
          <div>
            <Typography align="center" paragraph={true} variant="body1">
              Don't have an account?
            </Typography>
            <Button fullWidth={true} variant="raised" color="secondary">
              Create an Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}

const LoginWithRouter = withRouter(Login)
const StyledLogin = withStyles(styles, { withTheme: true })(LoginWithRouter)

export default withMobileDialog()(StyledLogin)
