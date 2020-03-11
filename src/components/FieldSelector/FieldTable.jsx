import React from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  withStyles
} from "@material-ui/core/";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

const FieldTable = ({ classes, fields }) => {
  return (
    <div>
      {fields.filter(obj => obj.selected).length > 0 ? (
        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                {fields
                  .filter(obj => obj.selected)
                  .map(column => {
                    return <TableCell key={column.id}>{column.name}</TableCell>;
                  })}
              </TableRow>
            </TableHead>
          </Table>
        </Paper>
      ) : (
        <Typography variant="h2" className={classes.root}>
          Select some fields from the left
        </Typography>
      )}
    </div>
  );
};

export default withStyles(styles)(FieldTable);
