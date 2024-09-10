import {
  AppBar,
  Divider,
  ListItemIcon,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useColorModeContext } from "../contexts/ThemeContext";
import Brightness7 from "@mui/icons-material/Brightness7";
import Brightness4 from "@mui/icons-material/Brightness4";




function NavBar() {
  const colorMode = useColorModeContext();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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

    <AppBar color="inherit">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link
          to="/"
          component={NavLink}
          color="text.primary"
        >
          <Typography variant="h5">
            E{!isSmallScreen && "ventually"}
          </Typography>
        </Link>
        <Stack
          direction="row" alignItems="center" spacing={2} divider={<Divider orientation="vertical" flexItem />}
        >
          <Link
            to="/events"
            component={NavLink}
            color="text.primary"
          >
            <Typography variant="body1">Events</Typography>
          </Link>
          <Link
            to="/map"
            component={NavLink}
            color="text.primary"
          >
            <Typography variant="body1">Map</Typography>
          </Link>
          <Link
            to="/favourites"
            component={NavLink}
            color="text.primary"
          >
            <Typography variant="body1">Favourites</Typography>
          </Link>
        </Stack>
        <Stack
          direction="row" alignItems="center" spacing={2} divider={<Divider orientation="vertical" flexItem />}
        >
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
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
        </Stack>
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
                to={`/profiles/${currentUser?.pk}`}
                component={NavLink}
                color="text.primary"
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  My Profile
                </MenuItem>
              </Link>
              <Link
                to="/create-event"
                component={NavLink}
                color="text.primary"
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
                onClick={handleLogout}
                color="text.primary"
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
              <Link
                to="/login"
                component={NavLink}
                color="text.primary"
              >
                <MenuItem
                  onClick={handleClose}
                  sx={{ textDecoration: "none" }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Login
                </MenuItem>
              </Link>
              <Link
                to="/register"
                component={NavLink}
                color="text.primary"
              >
                <MenuItem
                  onClick={handleClose}

                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Register
                </MenuItem>
              </Link>
            </div>
          )}
        </Menu>
      </Toolbar>
    </AppBar>

  );
}

export default NavBar;
