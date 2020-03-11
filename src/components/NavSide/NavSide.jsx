import React from "react";
import { Subscribe } from "unstated";
import classNames from "classnames";
import { useHistory } from "react-router-dom";

// Mui
import {
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer
} from "@material-ui/core";
import {
  ChevronLeft,
  ExitToApp as LogoutIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  ViewCompact as ComponentsIcon
} from "@material-ui/icons";

// custom comps
import SessionContainer from "../../containers/session";
import UiContainer from "../../containers/ui";
import * as routes from "../../routes";

// Styles
import { makeStyles } from "@material-ui/core/styles";
import { styles } from "./styles";
const useStyles = makeStyles(styles);

// menu items
const navigationItems = [
  { icon: <HomeIcon />, name: "Home", link: routes.DASHBOARD },
  { icon: <ComponentsIcon />, name: "Components", link: routes.COMPONENTS },
  { icon: <SettingsIcon />, name: "Account Settings", link: routes.ACCOUNT }
];

export default function NavSide() {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (link, handleClick) => {
    if (link) {
      history.push(link);
      handleClick();
    }
  };

  const handleSignOut = () => {
    SessionContainer.signOutUser().then(() => UiContainer.handleDrawerClose());
  };

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <Subscribe to={[SessionContainer, UiContainer]}>
      {(session, ui) => {
        if (session.state.authUser) {
          return (
            <div>
              <Hidden mdUp>
                <SwipeableDrawer
                  open={ui.state.navSide}
                  onClose={ui.toggleDrawer}
                  onOpen={ui.toggleDrawer}
                  disableBackdropTransition={!iOS}
                  disableDiscovery={iOS}
                >
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={ui.toggleDrawer}
                    onKeyDown={ui.toggleDrawer}
                  >
                    <div className={classes.list}>
                      <List>
                        {navigationItems.map(item => {
                          const { link } = item;
                          return (
                            <ListItem
                              key={item.name}
                              onClick={() =>
                                handleClick(link, ui.handleDrawerClose)
                              }
                              className={classes.link}
                            >
                              <ListItemIcon>{item.icon}</ListItemIcon>
                              <ListItemText primary={item.name} />
                            </ListItem>
                          );
                        })}
                        <ListItem
                          onClick={session.handleSignOut}
                          className={classes.link}
                        >
                          <ListItemIcon>
                            <LogoutIcon />
                          </ListItemIcon>
                          <ListItemText primary="Sign Out" />
                        </ListItem>
                      </List>
                    </div>
                  </div>
                </SwipeableDrawer>
              </Hidden>
              <Hidden smDown implementation="css">
                <Drawer
                  variant="permanent"
                  classes={{
                    paper: classNames(
                      classes.drawerPaper,
                      !ui.state.navSide && classes.drawerPaperClose
                    )
                  }}
                  open={ui.state.navSide}
                  onMouseEnter={ui.handleDrawerOpen}
                  onMouseLeave={ui.handleDrawerClose}
                >
                  <div className={classes.toolbar}>
                    <IconButton onClick={ui.toggleDrawer}>
                      <ChevronLeft />
                    </IconButton>
                  </div>
                  <Divider />
                  <List>
                    {navigationItems.map(item => {
                      const { link } = item;
                      return (
                        <ListItem
                          key={item.name}
                          onClick={() =>
                            handleClick(link, ui.handleDrawerClose)
                          }
                          className={classes.link}
                        >
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.name} />
                        </ListItem>
                      );
                    })}
                    <ListItem onClick={handleSignOut} className={classes.link}>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sign Out" />
                    </ListItem>
                  </List>
                </Drawer>
              </Hidden>
            </div>
          );
        } else {
          return null;
        }
      }}
    </Subscribe>
  );
}
