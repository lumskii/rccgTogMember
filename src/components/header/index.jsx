import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, ListItemIcon, Divider } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { Logout } from "@mui/icons-material";

export const user = {
  name: "John Doe",
}

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/users?email=${authUser.email}`);
          if (response.ok) {
            const userData = await response.json();
            const userFromMockApi = userData.length > 0 ? userData[0] : null;

            setCurrentUser(userFromMockApi);
          } else {
            console.error('Failed to fetch user data from MockAPI')
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth.signOut();
    handleClose();
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            flexGrow: 1,
            fontWeight: "bold",
          }}
        >
          TOGP 
        </Typography>
        <Button component={Link} to="/help" color="inherit">
          Help
        </Button>
        {auth.currentUser && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem sx={{ pointerEvents: 'none' }}>{currentUser ? `Hello ${currentUser.firstName}` : `user`}</MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;


