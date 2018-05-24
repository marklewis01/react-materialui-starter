import React, { Component } from 'react'
import classNames from 'classnames'
import { inject, observer } from 'mobx-react'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'

const drawerWidth = 72

const styles = theme => ({
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`
  },
  hide: {
    display: 'none'
  }
})

const TopNav = inject('uiStore')(
  observer(
    class TopNav extends Component {
      render() {
        const { classes, theme } = this.props

        return (
          <AppBar
            position="absolute"
            className={classNames(
              classes.appBar
              // this.props.uiStore.sidebarVisible && classes.appBarShift
            )}
          >
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                Mini variant drawer
              </Typography>
            </Toolbar>
          </AppBar>
        )
      }
    }
  )
)

export default withStyles(styles, { withTheme: true })(TopNav)
