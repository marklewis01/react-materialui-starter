import React from 'react'
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  withStyles
} from '@material-ui/core/'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  tableWrapper: {
    overflowX: 'auto'
  }
})

const FieldTable = ({ classes, fields }) => {
  console.log(fields.filter(obj => obj.selected).length)
  return (
    <Paper className={classes.root}>
      {fields.filter(obj => obj.selected).length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              {fields.filter(obj => obj.selected).map(column => {
                return <TableCell key={column.id}>{column.name}</TableCell>
              })}
            </TableRow>
          </TableHead>
        </Table>
      ) : (
        <Typography variant="title">
          Select some fields from the left
        </Typography>
      )}
    </Paper>
  )
}

export default withStyles(styles)(FieldTable)
