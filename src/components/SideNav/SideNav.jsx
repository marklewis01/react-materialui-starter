import React, { Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import { NavLink } from 'react-router-dom'
import { compose } from 'recompose'

import withAuthorization from '../Session/withAuthorization'

import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import Icon from '@material-ui/core/Icon'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Typography } from '@material-ui/core'

const styles = theme => ({
  drawerPaper: {
    backgroundColor: '#1f2126',
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
  sidenavFooter: {
    marginBottom: '1rem'
  }
})

const SideNav = inject('uiStore')(
  observer(
    class ObserverSideNav extends React.Component {
      constructor(props) {
        super(props)

        this.state = {
          sidebar: false
        }
      }

      handleDrawerOpen = () => {
        this.setState({
          sidebar: true
        })
      }

      handleDrawerClose = () => {
        this.setState({
          sidebar: false
        })
      }

      handleDrawerToggle = () => {
        const sidebar = this.state.sidebar
        this.setState({
          sidebar: !sidebar
        })
      }

      render() {
        const { classes, theme } = this.props
        const { sidebar } = this.state

        const menu = [
          {
            sectionName: classes.sidenavPrimary,
            sectionItems: [
              {
                icon: 'view_list',
                to: '/list',
                label: 'List'
              },
              {
                icon: 'pan_tool',
                to: '/drag',
                label: 'Drag'
              }
            ]
          },
          {
            sectionName: classes.sidenavFooter,
            sectionItems: [
              {
                icon: 'settings',
                to: '/settings',
                label: 'Settings'
              }
            ]
          }
        ]

        const drawer = (
          <Fragment>
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
            {menu.map((section, index) => (
              <div key={index} className={section.sectionName}>
                {section.sectionItems.map((item, i) => (
                  <List key={index + '-' + i} component="nav">
                    <NavLink to={item.to} onClick={this.handleDrawerClose}>
                      <ListItem button>
                        <ListItemText primary={item.label} />
                        <ListItemIcon>
                          <Icon>{item.icon}</Icon>
                        </ListItemIcon>
                      </ListItem>
                    </NavLink>
                  </List>
                ))}
              </div>
            ))}
          </Fragment>
        )

        return (
          <div>
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={sidebar}
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
                classes={{
                  paper: classNames(
                    classes.drawerPaper,
                    !sidebar && classes.drawerPaperClose
                  )
                }}
                open={sidebar}
                onMouseEnter={this.handleDrawerOpen}
                onMouseLeave={this.handleDrawerClose}
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

const StyledSideNav = withStyles(styles, { withTheme: true })(SideNav)

const authCondition = authUser => !!authUser

// const AuthSideNav = withAuthentication(authCondition)(StyledSideNav)

export default compose(withAuthorization(authCondition), inject('userStore'))(
  StyledSideNav
)
