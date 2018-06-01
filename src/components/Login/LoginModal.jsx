import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Divider from '@material-ui/core/Divider'
import green from '@material-ui/core/colors/green'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import withMobileDialog from '@material-ui/core/withMobileDialog'

import { auth, db } from '../../firebase'
import * as routes from '../../routes'

const INITIAL_STATE = {
  email: '',
  error: null,
  familyName: '',
  givenName: '',
  loading: false,
  password: '',
  option: 'login'
}

const styles = theme => ({
  buttonSuccess: {
    backgroundColor: green[500],
    marginTop: '1rem',
    marginBottom: '1.5rem',
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
    cursor: 'pointer'
  },
  paper: {
    [theme.breakpoints.up('sm')]: {
      width: '400px'
    }
  },
  register: {
    marginTop: '1rem'
  }
})

class LoginModal extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onCloseModal = () => {
    this.props.toggleLogin()
    this.setState(() => ({ ...INITIAL_STATE }))
  }

  changeComponent = obj => {
    this.setState((prevState, props) => {
      return {
        option: obj.value
      }
    })
  }

  updateByPropertyName = obj => {
    const { key } = obj
    this.setState((prevState, props) => {
      return { [key]: obj.value }
    })
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  handleLogin = event => {
    const { history, closeLogin } = this.props // do i still need this
    const { email, password } = this.state

    if (!this.state.loading) {
      this.setState(
        prevState => {
          return {
            ...prevState,
            loading: true
          }
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
              this.setState(prevState => {
                return {
                  ...prevState,
                  error
                }
              })
            })
        }
      )
    }
    event.preventDefault()
  }

  handleReset = event => {
    const { email } = this.state

    if (!this.state.loading) {
      this.setState(
        prevState => {
          return {
            ...prevState,
            loading: true
          }
        },
        () => {
          auth
            .doPasswordReset(email)
            .then(() => {
              this.setState(() => ({ ...INITIAL_STATE }))
            })
            .catch(error => {
              this.setState(prevState => {
                return {
                  ...prevState,
                  error
                }
              })
            })
        }
      )
    }
    event.preventDefault()
  }

  handleRegister = event => {
    const { username, email, password } = this.state
    const { history } = this.props

    if (!this.state.loading) {
      this.setState(
        prevState => {
          return {
            ...prevState,
            loading: true
          }
        },
        () => {
          auth
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
              // Create a user in your own accessible Firebase Database too
              db
                .doCreateUser(authUser.uid, username, email)
                .then(() => {
                  this.setState(() => ({ ...INITIAL_STATE }))
                  history.push(routes.DASHBOARD)
                })
                .catch(error => {
                  this.setState(prevState => {
                    return {
                      ...prevState,
                      error
                    }
                  })
                })
            })
            .catch(error => {
              this.setState(prevState => {
                return {
                  ...prevState,
                  error
                }
              })
            })
        }
      )
    }
    event.preventDefault()
  }

  timer = undefined

  render() {
    const { loginModal, classes } = this.props
    const {
      email,
      familyName,
      givenName,
      loading,
      option,
      password
    } = this.state

    const screen = {
      login: {
        title: 'Log in to your account',
        altLink: 'Forgot your password',
        altLinkTarget: 'reset',
        buttonText: 'Login',
        fields: [
          {
            id: 'email',
            label: 'Email Address',
            type: 'email',
            autoFocus: true,
            autoComplete: 'email',
            value: this.state.email
          },
          {
            id: 'password',
            label: 'Password',
            type: 'password',
            autoComplete: 'current-password',
            value: this.state.password
          }
        ],
        isValid: password === '' || email === '' || loading,
        onSubmit: this.handleLogin
      },
      reset: {
        title: 'Reset your password',
        altLink: 'Remembered it? Go back to login?',
        altLinkTarget: 'login',
        buttonText: 'Reset',
        fields: [
          {
            id: 'email',
            label: 'Email Address',
            type: 'email',
            autoComplete: 'email',
            value: this.state.email
          }
        ],
        isValid: email === '' || loading,
        onSubmit: this.handleReset
      },
      register: {
        title: 'Register for a New Account',
        altLink: '',
        buttonText: 'Register',
        fields: [
          {
            id: 'givenName',
            label: 'First Name',
            type: 'text',
            autoFocus: true,
            autoComplete: 'given-name',
            value: this.state.givenName
          },
          {
            id: 'familyName',
            label: 'Surname',
            type: 'text',
            autoComplete: 'family-name',
            value: this.state.familyName
          },
          {
            id: 'email',
            label: 'Email Address',
            type: 'email',
            autoComplete: 'email',
            value: this.state.email
          },
          {
            id: 'password',
            label: 'Password',
            type: 'password',
            autoComplete: 'current-password',
            value: this.state.password
          }
        ],
        isValid:
          givenName === '' ||
          familyName === '' ||
          email === '' ||
          password === '' ||
          loading,
        onSubmit: this.handleRegister
      }
    }

    return (
      <Dialog
        open={loginModal}
        onBackdropClick={this.onCloseModal}
        transitionDuration={100}
        classes={{ paper: classes.paper }}
      >
        <DialogContent>
          <Typography align="center" variant="headline">
            {screen[option].title}
          </Typography>
          <form onSubmit={screen[option].onSubmit}>
            {screen[option].fields.map(field => {
              return (
                <TextField
                  key={field.id}
                  autoFocus={field.autoFocus}
                  fullWidth
                  margin="dense"
                  id={field.id}
                  label={field.label}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  value={field.value}
                  disabled={loading}
                  onChange={event => {
                    this.updateByPropertyName({
                      key: field.id,
                      value: event.target.value
                    })
                  }}
                />
              )
            })}
            <Typography align="right">
              <Button
                disabled={loading}
                disableFocusRipple={true}
                disableRipple={true}
                size="small"
                color="prim"
                onClick={() =>
                  this.changeComponent({
                    value: screen[option].altLinkTarget
                  })
                }
              >
                {screen[option].altLink}
              </Button>
            </Typography>

            <Button
              fullWidth={true}
              variant="raised"
              color="primary"
              className={classes.buttonSuccess}
              disabled={screen[option].isValid}
              type="submit"
              onClick={this.onSubmit}
            >
              {screen[option].buttonText}
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Button>
          </form>

          <Divider />
          {option !== 'register' ? (
            <div className={classes.register}>
              <Typography align="center" paragraph={true} variant="body1">
                Don't have an account?
              </Typography>
              <Button
                fullWidth={true}
                variant="raised"
                color="secondary"
                disabled={loading}
                onClick={() =>
                  this.changeComponent({
                    value: 'register'
                  })
                }
              >
                Create a Trial Account
              </Button>
            </div>
          ) : (
            <div className={classes.register}>
              <Typography align="center">
                <Button
                  disabled={loading}
                  disableFocusRipple={true}
                  disableRipple={true}
                  size="small"
                  color="prim"
                  onClick={() =>
                    this.changeComponent({
                      value: 'login'
                    })
                  }
                >
                  Go back to login
                </Button>
              </Typography>
            </div>
          )}
        </DialogContent>
      </Dialog>
    )
  }
}

const LoginModalWithRouter = withRouter(LoginModal)
const StyledModal = withStyles(styles, { withTheme: true })(
  LoginModalWithRouter
)

export default withMobileDialog()(StyledModal)
