import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Modal from '@material-ui/core/Modal'

import DialogContent from '@material-ui/core/DialogContent'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import withMobileDialog from '@material-ui/core/withMobileDialog'

import LoginForm from './LoginForm'
import ResetForm from './ResetForm'

const INITIAL_STATE = {
  email: '',
  error: null,
  password: '',
  show: 'true'
}

const styles = theme => ({
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

  changeComponent = prevState => {
    this.setState(prevState => {
      return { show: !prevState.show }
    })
  }

  updateByPropertyName = obj => {
    const { key } = obj
    this.setState((prevState, props) => {
      return { [key]: obj.value }
    })
  }

  render() {
    const { loginModal, classes } = this.props
    const { email, password, show } = this.state
    const logIn = show ? (
      <LoginForm
        email={email}
        password={password}
        show={this.changeComponent}
        updateByPropertyName={this.updateByPropertyName}
      />
    ) : (
      <ResetForm email={email} show={this.changeComponent} />
    )

    return (
      <Dialog
        open={loginModal}
        onBackdropClick={this.onCloseModal}
        transitionDuration={100}
        classes={{ paper: classes.paper }}
      >
        <DialogContent>
          {logIn}
          <Divider />
          <div className={classes.register}>
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

const LoginModalWithRouter = withRouter(LoginModal)
const StyledModal = withStyles(styles, { withTheme: true })(
  LoginModalWithRouter
)

export default withMobileDialog()(StyledModal)
