import React, { Component } from 'react'
import { Subscribe } from 'unstated'
import classNames from 'classnames'
import { withRouter } from 'react-router-dom'

import {
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  withStyles
} from '@material-ui/core'

import {
  ChevronLeft,
  CheckBox as TodoIcon,
  ExitToApp as LogoutIcon,
  Home as HomeIcon,
  Settings as SettingsIcon
} from '@material-ui/icons'

import SessionContainer from '../../containers/session'
import UiContainer from '../../containers/ui'
import * as routes from '../../routes'

const drawerWidth = 240

const navigationItems = [
  { icon: <HomeIcon />, name: 'Home', link: routes.DASHBOARD },
  { icon: <TodoIcon />, name: 'Task List', link: routes.TODOS },
  { icon: <SettingsIcon />, name: 'Account Settings', link: routes.ACCOUNT }
]

const styles = theme => ({
  list: {
    width: 250
  },
  link: {
    cursor: 'pointer'
  },
  fullList: {
    width: 'auto'
  },
  drawerPaper: {
    position: 'fixed',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    whiteSpace: 'nowrap',
    width: drawerWidth,
    zIndex: 1000
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  }
})

class NavSide extends Component {
  handleClick = link => {
    if (link) {
      this.props.history.push(link)
    }
  }

  render() {
    const { classes } = this.props
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

    return (
      <Subscribe to={[SessionContainer, UiContainer]}>
        {(session, ui) => {
          return (
            <div>
              <Hidden mdUp>
                <SwipeableDrawer
                  open={ui.state.navSide}
                  onClose={ui.toggleDrawer}
                  onOpen={ui.toggleDrawer}
                  disableBackdropTransition={!iOS}
                  disableDiscovery={iOS}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={ui.toggleDrawer}
                    onKeyDown={ui.toggleDrawer}
                  >
                    <div className={classes.list}>
                      <List>
                        {navigationItems.map(item => {
                          const { link } = item
                          return (
                            <ListItem
                              key={item.name}
                              onClick={() => this.handleClick(link)}
                              className={classes.link}
                            >
                              <ListItemIcon>{item.icon}</ListItemIcon>
                              <ListItemText primary={item.name} />
                            </ListItem>
                          )
                        })}
                        <ListItem
                          onClick={session.handleSignOut}
                          className={classes.link}
                        >
                          <ListItemIcon>
                            <LogoutIcon />
                          </ListItemIcon>
                          <ListItemText primary="Sign Out" />
                        </ListItem>
                      </List>
                    </div>
                  </div>
                </SwipeableDrawer>
              </Hidden>
              <Hidden smDown implementation="css">
                <Drawer
                  variant="permanent"
                  classes={{
                    paper: classNames(
                      classes.drawerPaper,
                      !ui.state.navSide && classes.drawerPaperClose
                    )
                  }}
                  open={ui.state.navSide}
                  onMouseEnter={ui.handleDrawerOpen}
                  onMouseLeave={ui.handleDrawerClose}
                >
                  <div className={classes.toolbar}>
                    <IconButton onClick={ui.toggleDrawer}>
                      <ChevronLeft />
                    </IconButton>
                  </div>
                  <Divider />
                  <List>
                    {navigationItems.map(item => {
                      const { link } = item
                      return (
                        <ListItem
                          key={item.name}
                          onClick={() => this.handleClick(link)}
                          className={classes.link}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.name} />
                        </ListItem>
                      )
                    })}
                    <ListItem
                      onClick={session.handleSignOut}
                      className={classes.link}
                    >
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sign Out" />
                    </ListItem>
                  </List>
                </Drawer>
              </Hidden>
            </div>
          )
        }}
      </Subscribe>
    )
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(NavSide))
