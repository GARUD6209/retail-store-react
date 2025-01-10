// Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutComponent from "./LogoutComponent";

const Navbar = ({ isAdmin, onLogout, auth }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Harsh Codes
        </Typography>
        <Box>
          {auth && (
            <>
              <Button color="inherit" onClick={() => navigate("/profile")}>
                Profile
              </Button>
              {isAdmin && (
                <Button
                  color="inherit"
                  onClick={() => navigate("/user-management")}
                >
                  User Management
                </Button>
              )}
              <LogoutComponent onLogoutButton={onLogout} />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
