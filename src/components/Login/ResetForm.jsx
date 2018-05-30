import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
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
    marginTop: -12,
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

class PasswordForgetForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email } = this.state

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error))
      })

    event.preventDefault()
  }

  render() {
    const { classes, email, mark, show } = this.props
    const { loading, password, success, error } = this.state
    const isInvalid = password === '' || email === ''

    return (
      <Fragment>
        <Typography align="center" variant="headline">
          Reset your password
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
              onChange={event =>
                this.setState(updateByPropertyName('email', event.target.value))
              }
            />
          </div>
          <Typography
            align="right"
            color="primary"
            onClick={show}
            className={classes.link}
          >
            Remembered it? Go back to login?
          </Typography>

          <Button
            fullWidth={true}
            variant="raised"
            color="secondary"
            className={classes.buttonSuccess}
            disabled={loading}
            type="submit"
            onClick={this.show}
          >
            Reset
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </form>
      </Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(PasswordForgetForm)
