import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";

import { FieldSelector, FieldTable } from "./index";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: [
        { id: 0, name: "Name", selected: true },
        { id: 1, name: "Date", selected: true },
        { id: 2, name: "Size", selected: false },
        { id: 3, name: "Colour", selected: false },
        { id: 4, name: "Options", selected: false },
        { id: 5, name: "Price", selected: false }
      ]
    };
  }

  handleSelect = id => {
    const fields = [...this.state.fields];
    const current = fields[id].selected;
    fields[id].selected = !current;
    this.setState({
      fields
    });
  };

  render() {
    const { fields } = this.state;
    return (
      <div>
        <Grid container style={{ marginBottom: `1rem` }}>
          <Grid item md={8}>
            <Typography variant="h3">Table Column Chooser</Typography>
            <Typography>
              Built upon existing sample code from
              <a
                href="https://material-ui.com/demos/tables/"
                rel="noopener noreferrer"
                target="_blank"
              >
                &nbsp;material-ui.com
              </a>
              , with the intention of allowing custom views for a dashboard
              (with field selection persisted rather then just local state as in
              this example).
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={16}>
          <Grid item sm={4}>
            <Typography variant="subheading">Fields to choose from:</Typography>
            <FieldSelector
              fields={fields}
              selected={this.isSelected}
              handleClick={this.handleClick}
              handleSelectAll={this.handleSelectAllClick}
              handleSelect={this.handleSelect}
            />
          </Grid>
          <Grid item sm={8}>
            <Typography variant="subheading">
              Table updates with columns:
            </Typography>
            <FieldTable fields={fields} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Layout;
