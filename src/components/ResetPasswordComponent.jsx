import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import {
  Container,
  Box,
  Typography,
  Alert,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ResetPasswordComponent = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // Tracks the current step in the process
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false); // New state for redirection prompt
  const navigate = useNavigate();

  const handleGenerateOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/reset/otp/${email}`);
      setMessage({ type: "success", text: response.data });
      setStep(2);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data || "Error generating OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/reset/verify-otp`, {
        params: { email, otp },
      });
      setMessage({ type: "success", text: response.data });
      setStep(3);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data || "Invalid OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/reset/update-password`,
        null,
        {
          params: { email, otp, newPassword },
        }
      );
      setMessage({ type: "success", text: response.data });
      setStep(4); // Final step
      setRedirecting(true); // Set redirecting state to true
      setTimeout(() => {
        navigate("/login"); // Redirect after 2 seconds
      }, 2000);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data || "Error updating password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={4} p={3} borderRadius={2} boxShadow={3}>
        <Typography variant="h5" gutterBottom align="center">
          Reset Password
        </Typography>
        {message && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}
        {step === 1 && (
          <Box>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleGenerateOtp}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Generate OTP"
              )}
            </Button>
          </Box>
        )}
        {step === 2 && (
          <Box>
            <TextField
              label="OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Verify OTP"
              )}
            </Button>
          </Box>
        )}
        {step === 3 && (
          <Box>
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUpdatePassword}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Update Password"
              )}
            </Button>
          </Box>
        )}
        {step === 4 && (
          <Typography variant="body1" align="center" color="success.main">
            Password reset successfully! You can now log in with your new
            password.
          </Typography>
        )}
        {redirecting && (
          <Typography
            variant="body2"
            align="center"
            color="textSecondary"
            sx={{ mt: 2 }}
          >
            Redirecting to the login page...
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ResetPasswordComponent;