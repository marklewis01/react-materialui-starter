import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Subscribe } from 'unstated'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import {
  Avatar,
  Button,
  Hidden,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core'

import { Menu as MenuIcon } from '@material-ui/icons'

import SessionContainer from '../../containers/session'
import UiContainer from '../../containers/ui'

import { firebaseAuth } from '../../firebase'
import * as routes from '../../routes'

const styles = theme => ({
  root: {
    backgroundColor: '#fff',
    width: '100%',
    paddingLeft: '48px',
    [theme.breakpoints.down('md')]: {
      paddingLeft: 'unset'
    }
  },
  avatar: {
    backgroundColor: theme.palette.primary.main
  },
  hide: {
    display: 'none'
  },
  menuButton: {},
  toolbar: {
    justifyContent: 'space-between',
    paddingLeft: '16px',
    paddingRight: '16px'
  }
})

class NavTop extends Component {
  state = {
    sidebar: false
  }

  handleMenuToggle = () => {
    this.setState({ sidebar: !this.state.sidebar })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleSignOut = () => {
    firebaseAuth()
      .doSignOut()
      .catch(error => {
        console.log('error:', error)
      })
  }

  render() {
    const { classes, toggleModal } = this.props

    return (
      <Subscribe to={[SessionContainer, UiContainer]}>
        {(session, ui) => {
          const { authUser } = session.state
          return (
            <AppBar position="absolute" className={classes.root} elevation={1}>
              <Toolbar className={classes.toolbar}>
                <Hidden mdUp>
                  <IconButton
                    className={classes.menuButton}
                    color="primary"
                    aria-label="Menu"
                    onClick={ui.toggleDrawer}
                  >
                    <MenuIcon />
                  </IconButton>
                </Hidden>
                <Link to={routes.LANDING}>
                  <Typography>Brand / Logo</Typography>
                </Link>
                {authUser ? (
                  <div>
                    <Hidden mdDown>
                      <Avatar className={classes.avatar}>
                        {authUser.avatarLetter}
                      </Avatar>
                    </Hidden>
                  </div>
                ) : (
                  <div>
                    <Button onClick={toggleModal} target={'register'}>
                      Register
                    </Button>
                    <Button onClick={toggleModal}>Login</Button>
                  </div>
                )}
              </Toolbar>
            </AppBar>
          )
        }}
      </Subscribe>
    )
  }
}

export default withStyles(styles, { withTheme: true })(NavTop)
