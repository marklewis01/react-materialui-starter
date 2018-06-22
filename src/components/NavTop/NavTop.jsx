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
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@material-ui/core'

import { Menu as MenuIcon } from '@material-ui/icons'

import UiContainer from '../../containers/ui'
import { auth } from '../../firebase'
import * as routes from '../../routes'
import { withAuthentication } from '../Session'

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
    sidebar: false,
    anchorEl: null
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
    auth.doSignOut().catch(error => {
      console.log('error:', error)
    })
  }

  render() {
    const { authUser, classes, toggleModal } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <Subscribe to={[UiContainer]}>
        {ui => {
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
                      <IconButton
                        aria-owns={open ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        aria-label="account menu"
                        onClick={this.handleMenu}
                        color="inherit"
                      >
                        <Avatar className={classes.avatar}>
                          {authUser.avatarLetter}
                        </Avatar>
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right'
                        }}
                        open={open}
                        onClose={this.handleMenuClose}
                      >
                        <Link to={routes.ACCOUNT}>
                          <MenuItem onClick={this.handleMenuClose}>
                            My account
                          </MenuItem>
                        </Link>
                        <MenuItem onClick={this.handleSignOut}>Logout</MenuItem>
                      </Menu>
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

export default withAuthentication(
  withStyles(styles, { withTheme: true })(NavTop)
)
