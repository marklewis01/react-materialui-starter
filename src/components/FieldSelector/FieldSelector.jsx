import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  withStyles
} from '@material-ui/core'
import { lighten } from '@material-ui/core/styles/colorManipulator'

class EnhancedTableHead extends React.Component {
  render() {
    const { onSelectAllClick, numSelected, rowCount } = this.props

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          <TableCell padding="none">Field Name</TableCell>
        </TableRow>
      </TableHead>
    )
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
})

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            Table Field Selector
          </Typography>
        )}
      </div>
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
}

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar)

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  }
})

class FieldSelector extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: []
    }
  }

  render() {
    const { classes, fields, handleSelect } = this.props

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table aria-labelledby="tableTitle">
            <TableBody>
              {fields.map(n => {
                return (
                  <TableRow
                    hover
                    onClick={() => handleSelect(n.id)}
                    role="checkbox"
                    aria-checked={n.selected}
                    tabIndex={-1}
                    key={n.id}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={n.selected} />
                    </TableCell>
                    <TableCell scope="row" padding="none">
                      {n.name}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    )
  }
}

FieldSelector.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FieldSelector)
