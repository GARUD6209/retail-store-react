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
    role: "",
    city: "",
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

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await register({
        username: formData.username,
        password: formData.password,
        role: formData.role,
        city: formData.city,
      });
      console.log(response);

      if (response.statusCode === 200) {
        setSuccessMessage("Registration successful! Please login.");
        setFormData({
          username: "",
          password: "",
          confirmPassword: "",
          role: "",
          city: "",
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
            id="role"
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="city"
            label="City"
            name="city"
            value={formData.city}
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
          <p className="footer-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
