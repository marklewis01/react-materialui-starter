import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import green from '@material-ui/core/colors/green'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { auth } from '../../firebase'
import * as routes from '../../routes'

const styles = theme => ({
  fieldsWrapper: {
    minHeight: '130px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  buttonSuccess: {
    backgroundColor: green[500],
    marginTop: '1rem',
    marginBottom: '1rem',
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -8,
    marginLeft: -12
  },
  link: {
    cursor: 'pointer'
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

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  onSubmit = event => {
    const { email, password, history, closeLogin } = this.props

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

  timer = undefined

  render() {
    const { classes, email, password, show, updateByPropertyName } = this.props
    const { loading, success, error } = this.state
    const isInvalid = password === '' || email === ''

    return (
      <Fragment>
        <Typography align="center" variant="headline">
          Log in to your account
        </Typography>
        <form onSubmit={this.onSubmit}>
          <div className={classes.fieldsWrapper}>
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
              onChange={event => {
                updateByPropertyName({
                  key: 'email',
                  value: event.target.value
                })
              }}
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
              onChange={event => {
                updateByPropertyName({
                  key: 'password',
                  value: event.target.value
                })
              }}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  this.onSubmit(e)
                  e.preventDefault()
                }
              }}
            />
          </div>

          <Typography
            align="right"
            color="primary"
            onClick={show}
            className={classes.link}
          >
            Forgot your password?
          </Typography>

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
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </form>
      </Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(LoginForm)
