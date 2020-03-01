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

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
    color: "#fafafa",
    marginLeft: "30px"
  }
}));

const Bar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Monthly Spending
          </Typography>
          <Box>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              className={classes.title}
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
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Sign out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Bar;
