import React, { useState } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Box
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useAuth0 } from "../utils/auth0-context";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    color: "#fafafa",
    marginLeft: "30px"
  },
  username: {
    color: "#fafafa",
    fontFamily: theme.typography.fontFamily,
    fontSize: "18px"
  }
}));

const Bar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { isLoading, user, logout } = useAuth0();

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box data-testid="bar">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Monthly Spending
          </Typography>
          <Box display="flex" alignItems="inherit">
            <Box className={classes.username}>{user.name}</Box>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              className={classes.username}
              data-testid="open-menu"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
              data-testid="menu"
            >
              {!isLoading && user && (
                <MenuItem
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Sign out
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Bar;
