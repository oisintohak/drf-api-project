import { AppBar, ListItemIcon, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Logout from "@mui/icons-material/Logout";
import Link from "@mui/material/Link";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";

function NavBar() {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const handleLogout = async () => {
    try {
      await axiosReq.post("auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar sx={{ position: "static" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link
          to="/"
          component={NavLink}
          sx={{
            textDecoration: "none",
            color: "white",
            "&:hover": {
              color: "white",
            },
          }}
          color="secondary"
        >
          <Typography variant="h5">Eventually</Typography>
        </Link>
        <Link
          to="/test"
          component={NavLink}
          sx={{
            textDecoration: "none",
            color: "white",
            "&:hover": {
              color: "white",
            },
          }}
          color="secondary"
        >
          <Typography variant="h5">test</Typography>
        </Link>

        <>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                src={currentUser?.profile_image}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {currentUser ? (
              <div>
                <Link
                  to="/create-event"
                  component={NavLink}
                  sx={{ textDecoration: "none" }}
                  color="primary"
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <AddBoxIcon />
                    </ListItemIcon>
                    Create Event
                  </MenuItem>
                </Link>
                <Link
                  to="/"
                  component={NavLink}
                  sx={{ textDecoration: "none" }}
                  onClick={handleLogout}
                >
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Link>
              </div>
            ) : (
              <div>
                <NavLink to="/login">
                  <MenuItem
                    onClick={handleClose}
                    sx={{ textDecoration: "none" }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Login
                  </MenuItem>
                </NavLink>
                <NavLink to="/register">
                  <MenuItem
                    onClick={handleClose}
                    sx={{ textDecoration: "none" }}
                  >
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Register
                  </MenuItem>
                </NavLink>
              </div>
            )}
          </Menu>
        </>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
