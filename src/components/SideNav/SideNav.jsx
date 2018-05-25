import React from 'react'
import { inject, observer } from 'mobx-react'
import { NavLink } from 'react-router-dom'

import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import DraftsIcon from '@material-ui/icons/Drafts'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import InboxIcon from '@material-ui/icons/Inbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  drawerPaper: {
    backgroundColor: '#ccc',
    left: 0,
    padding: '0 10px',
    position: 'fixed',
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    whiteSpace: 'nowrap',
    width: 200
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    left: '-152px'
    //   width: theme.spacing.unit * 6
    // }
  },
  sidenavBrandContent: {
    color: '#fff',
    textDecoration: 'none'
  },
  toolbar: {
    ...theme.mixins.toolbar
  },
  sidenavBrand: {
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sidenavPrimary: {
    flexGrow: 1
  },
  sidenavLower: {
    marginBottom: '1rem'
  }
})

const SideNav = inject('uiStore')(
  observer(
    class ObserverSideNav extends React.Component {
      state = {
        mobileOpen: false
      }

      // TODO: Move methods into store and out of component
      // handleDrawerOpen = () => {
      //   this.props.uiStore.sidebarVisible = true
      // }

      // handleDrawerClose = () => {
      //   this.props.uiStore.sidebarVisible = false
      // }

      handleDrawerToggle = () => {
        this.props.uiStore.sidebarVisible = !this.props.uiStore.sidebarVisible
      }

      render() {
        const { classes, theme } = this.props
        const { sidebarVisible } = this.props.uiStore

        const drawer = (
          <div>
            <div className={classes.sidenavBrand}>
              <NavLink to="/" className={classes.sidenavBrandContent}>
                <Typography variant="title" color="inherit">
                  SomeApp
                </Typography>
              </NavLink>
              <NavLink to="/">
                <DonutLargeIcon className={classes.sidenavBrandContent} />
              </NavLink>
            </div>
            <div className={classes.sidenavPrimary}>
              <List component="nav">
                <NavLink to="/list">
                  <ListItem button>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="List" />
                  </ListItem>
                </NavLink>
                <NavLink to="/drag">
                  <ListItem button>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drag" />
                  </ListItem>
                </NavLink>
              </List>
            </div>
            <div className={classes.sidenavLower}>
              <Divider />
              <List component="nav">
                <ListItem button>
                  <ListItemText primary="Trash" />
                </ListItem>
                <ListItem button component="a" href="#simple-list">
                  <ListItemText primary="Spam" />
                </ListItem>
              </List>
            </div>
          </div>
        )

        return (
          <div>
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={sidebarVisible}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
              <Drawer
                variant="permanent"
                open
                classes={{
                  paper: classNames(
                    classes.drawerPaper,
                    !sidebarVisible && classes.drawerPaperClose
                  )
                }}
                open={sidebarVisible}
                onMouseEnter={this.handleDrawerToggle}
                onMouseLeave={this.handleDrawerToggle}
              >
                {drawer}
              </Drawer>
            </Hidden>
          </div>
        )
      }
    }
  )
)

SideNav.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SideNav)
