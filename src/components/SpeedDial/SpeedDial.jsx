import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import HomeIcon from '@material-ui/icons/Home'
import AddIcon from '@material-ui/icons/NoteAdd'
import EditIcon from '@material-ui/icons/ModeEdit'

import * as routes from '../../routes'

const styles = theme => ({
  root: {
    flexDirection: 'column',
    left: theme.spacing.unit * 1.5,
    position: 'fixed',
    top: theme.spacing.unit * 9
  },
  actions: {
    flexDirection: 'column'
  }
})

const actions = [
  { icon: <HomeIcon />, name: 'Home', link: routes.DASHBOARD },
  { icon: <AddIcon />, name: 'Add New Document', link: routes.NEWDOC }
]

class NavSpeedDial extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      hidden: false
    }
  }

  handleVisibility = () => {
    this.setState({
      open: false,
      hidden: !this.state.hidden
    })
  }

  handleClick = link => {
    this.props.history.push(link)

    this.setState({
      open: !this.state.open
    })
  }

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true
      })
    }
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  render() {
    const { classes } = this.props
    const { hidden, open } = this.state

    return (
      <SpeedDial
        ariaLabel="Nav SpeedDial"
        classes={{ root: classes.root, actions: classes.actions }}
        hidden={hidden}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onBlur={this.handleClose}
        onClick={this.handleClick}
        onClose={this.handleClose}
        onFocus={this.handleOpen}
        onMouseEnter={this.handleOpen}
        onMouseLeave={this.handleClose}
        open={open}
      >
        {actions.map(action => {
          const { link } = action
          return (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => this.handleClick(link)}
            />
          )
        })}
      </SpeedDial>
    )
  }
}

NavSpeedDial.propTypes = {
  classes: PropTypes.object.isRequired
}

const NavSpeedDialWithRouter = withRouter(NavSpeedDial)

export default withStyles(styles)(NavSpeedDialWithRouter)
