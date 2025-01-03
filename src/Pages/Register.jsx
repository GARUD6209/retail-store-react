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
import { register } from "../Service/api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    cityId: "", // Set as an empty string initially
    name: "",
    mobileNumber: "",
    email: "",
    gstNumber: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // Make API call
      const response = await register({
        username: formData.username,
        password: formData.password,
        cityId: formData.cityId,
        name: formData.name,
        mobileNumber: formData.mobileNumber,
        email: formData.email,
        gstNumber: formData.gstNumber,
        address: formData.address,
      });

      console.log(
        "Status code from register component : " + response.statusCode
      );

      // Handle response
      if (response === "User registered successfully") {
        setSuccessMessage("Registration successful! Please login.");
        setFormData({
          username: "",
          password: "",
          confirmPassword: "",
          cityId: 0,
          name: "",
          mobileNumber: "",
          email: "",
          gstNumber: "",
          address: "",
        });
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: "20px", marginTop: "50px" }}>
        <Typography component="h1" variant="h5" align="center">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="mobileNumber"
            label="Mobile Number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="gstNumber"
            label="GST Number"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="address"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="cityId"
            label="City ID"
            name="cityId"
            type="number"
            value={formData.cityId}
            onChange={handleChange}
          />
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography color="success" variant="body2" align="center">
              {successMessage}
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
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
          <Typography align="center" variant="body2">
            Already have an account? <a href="/login">Login</a>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
