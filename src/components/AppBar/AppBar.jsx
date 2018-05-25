import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { inject, observer } from 'mobx-react'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

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

const TopNav = inject('uiStore')(
  observer(
    class TopNav extends Component {
      state = {
        auth: true,
        anchorEl: null
      }

      render() {
        const { classes, theme, uiStore } = this.props
        const { auth, anchorEl } = this.state
        const open = Boolean(anchorEl)

        return (
          <AppBar position="absolute" className={classes.root} elevation={1}>
            <Toolbar className={classes.toolbar}>
              <Hidden mdUp>
                <IconButton
                  className={classes.menuButton}
                  color="primary"
                  aria-label="Menu"
                  onClick={uiStore.handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              {auth ? (
                <Fragment>
                  <Typography variant="subheading" color="primary">
                    Some Text
                  </Typography>
                  <div>
                    <IconButton
                      aria-owns={open ? 'menu-appbar' : null}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src="/assets/images/wireframe/uxceo-128.jpg"
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
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                      <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    </Menu>
                  </div>
                </Fragment>
              ) : (
                <div>Some App Title</div>
              )}
            </Toolbar>
          </AppBar>
        )
      }
    }
  )
)

export default withStyles(styles, { withTheme: true })(TopNav)
