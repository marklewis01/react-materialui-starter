import React from 'react'
import { inject, observer } from 'mobx-react'

import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const drawerWidth = 240

const styles = theme => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 4
  },
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
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

const SideNav = inject('uiStore')(
  observer(
    class ObserverSideNav extends React.Component {
      // TODO: Move methods into store and out of component
      handleDrawerOpen = () => {
        this.props.uiStore.sidebarVisible = true
      }

      handleDrawerClose = () => {
        this.props.uiStore.sidebarVisible = false
      }

      render() {
        const { classes, theme } = this.props
        const { sidebarVisible } = this.props.uiStore

        return (
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(
                classes.drawerPaper,
                !sidebarVisible && classes.drawerPaperClose
              )
            }}
            open={sidebarVisible}
            onMouseEnter={this.handleDrawerOpen}
            onMouseLeave={this.handleDrawerClose}
          >
            <div className={classes.toolbar}>
              <IconButton>
                <DonutLargeIcon />
              </IconButton>
            </div>
          </Drawer>
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
