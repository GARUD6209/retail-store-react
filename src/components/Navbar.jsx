// Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isAdmin, onLogout }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Harsh Codes
        </Typography>
        <Box>
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
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
