import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { updateUserProfile } from "../Service/api";
import { useNavigate, useLocation } from "react-router-dom";
import CityDropdown from "../components/CityDropdown";

const UpdateProfile = () => {
  const location = useLocation();
  const profile = location.state || {}; // Fallback if no state is passed
  const [formData, setFormData] = useState(profile);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setError("");

    try {
      const response = await updateUserProfile(formData);
      if (response) {
        setSuccessMessage("Profile updated successfully!");
        navigate("/profile");
      } else {
        setError("Failed to update profile.");
      }
    } catch (err) {
      setError("An error occurred while updating profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "50px" }}>
        <Typography component="h1" variant="h5" align="center">
          Update Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
          {/* <TextField
            margin="normal"
            fullWidth
            type="number"
            id="cityId"
            label="City ID"
            name="cityId"
            value={formData.cityId || ""}
            onChange={handleChange}
          /> */}
          <CityDropdown
            value={formData.cityId || ""}
            onChange={handleChange} // Works as-is with the simulated event
            label="City"
          />
          <TextField
            margin="normal"
            fullWidth
            id="mobileNumber"
            label="Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber || ""}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="gstNumber"
            label="GST Number"
            name="gstNumber"
            value={formData.gstNumber || ""}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="address"
            label="Address"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
          />
          {successMessage && (
            <Typography color="primary" align="center">
              {successMessage}
            </Typography>
          )}
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Update Profile"}
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
            onClick={() => navigate("/profile")}
          >
            {loading ? <CircularProgress size={24} /> : "Cancel"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default UpdateProfile;
