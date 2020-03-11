import React from "react";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";

import avatarImg from "../../assets/img/uxceo-128.jpg";

const Team = ({ classes }) => {
  return (
    <div>
      <Typography variant="h2">Team Members</Typography>
      <List>
        {[0, 1, 2, 3].map(value => (
          <ListItem key={value} dense disableGutters>
            <Avatar alt="Some User" src={avatarImg} />
            <ListItemText
              primary={`Team Member ${value + 1}`}
              secondary={`Senior Architect`}
            />
          </ListItem>
        ))}
      </List>
      <Button fullWidth={true} variant="outlined">
        Add Team Member
      </Button>
    </div>
  );
};

export default Team;
