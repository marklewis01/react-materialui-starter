import React, { Component } from 'react'
import { Subscribe } from 'unstated'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import { Typography } from '@material-ui/core'

import userAvatar from '../../assets/img/uxceo-128.jpg'

import { auth } from '../../firebase'
import SessionContainer from '../../containers/session'
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

class TopNav extends Component {
  state = {
    sidebar: false,
    anchorEl: null
  }

  handleMenuToggle = () => {
    this.setState({ sidebar: !this.state.sidebar })
  }

  render() {
    const { classes, toggleModal } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <Subscribe to={[SessionContainer]}>
        {session => (
          <AppBar position="absolute" className={classes.root} elevation={1}>
            <Toolbar className={classes.toolbar}>
              <Link to={routes.LANDING}>
                <Typography>Brand / Logo</Typography>
              </Link>
              <Hidden mdUp>
                <IconButton
                  className={classes.menuButton}
                  color="primary"
                  aria-label="Menu"
                  onClick={this.handleMenuToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              {session.state.authUser ? (
                <NavigationAuth classes={classes} menuOpen={open} />
              ) : (
                <NavigationNonAuth toggleModal={toggleModal} />
              )}
            </Toolbar>
          </AppBar>
        )}
      </Subscribe>
    )
  }
}

class NavigationAuth extends React.Component {
  state = {
    anchorEl: null
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div>
        <Link to={routes.DASHBOARD}>Dashboard</Link>
        <Hidden mdDown>
          <IconButton
            aria-owns={open ? 'menu-appbar' : null}
            aria-haspopup="true"
            aria-label="account menu"
            onClick={this.handleMenu}
            color="inherit"
          >
            <Avatar
              alt="Jane Doe"
              src={userAvatar}
              className={classes.avatar}
            />
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
              <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
            </Link>
            <MenuItem onClick={auth.doSignOut}>Logout</MenuItem>
          </Menu>
        </Hidden>
      </div>
    )
  }
}

const NavigationNonAuth = ({ toggleModal }) => (
  <div>
    <Button onClick={toggleModal} target={'register'}>
      Register
    </Button>
    <Button onClick={toggleModal}>Login</Button>
  </div>
)

export default withStyles(styles, { withTheme: true })(TopNav)
