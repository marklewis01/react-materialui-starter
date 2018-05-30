import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import green from '@material-ui/core/colors/green'
import Typography from '@material-ui/core/Typography'
import withMobileDialog from '@material-ui/core/withMobileDialog'

import LoginForm from './Login/LoginForm'

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

const INITIAL_STATE = {
  error: null,
  loading: false,
  success: false
}

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onCloseModal = () => {
    this.props.toggleLogin()
    this.setState(() => ({ ...INITIAL_STATE }))
  }

  render() {
    const { loginModal } = this.props

    return (
      <Dialog open={loginModal} onBackdropClick={this.onCloseModal}>
        <DialogContent>
          <LoginForm />
        </DialogContent>
        <DialogContent>
          <div>
            <Typography align="center" paragraph={true} variant="body1">
              Don't have an account?
            </Typography>
            <Button fullWidth={true} variant="raised" color="secondary">
              Create a Trial Account
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
