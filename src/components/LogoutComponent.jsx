import React from "react";
import { Button } from "@mui/material";

const LogoutComponent = ({ onLogoutButton }) => {
  return (
    <Button color="inherit" onClick={onLogoutButton}>
      Logout
    </Button>
  );
};

export default LogoutComponent;
