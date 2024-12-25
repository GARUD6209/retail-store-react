// Footer.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 3,
        textAlign: "center",
        backgroundColor: "#f8f8f8",
      }}
    >
      <Typography variant="body1">
        © {new Date().getFullYear()} Harshvardhan Chandravanshi. All rights
        reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
