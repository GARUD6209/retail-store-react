import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Button,
  Avatar,
  Grid,
} from "@mui/material";
import { getUserProfile } from "../Service/api";
import { useNavigate } from "react-router-dom";

const Profile = ({ userName, userRole, onLogout }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const profileData = await getUserProfile();
        if (profileData) {
          setProfile(profileData);
        } else {
          setError("Failed to load profile.");
        }
      } catch (err) {
        setError("Error loading profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <Typography align="center">Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        style={{ padding: "20px", marginTop: "50px", borderRadius: "16px" }}
      >
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Profile
        </Typography>
        {profile && (
          <Grid container spacing={2}>
            <Grid item xs={12} align="center">
              <Avatar
                sx={{ width: 80, height: 80 }}
                alt={profile.username}
                src="/static/images/avatar/1.jpg"
              >
                {profile.username && profile.username.charAt(0).toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs={12}>
              <Typography>Name: {profile.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Email: {profile.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>City ID: {profile.cityId}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Mobile: {profile.mobileNumber}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>GST Number: {profile.gstNumber}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>Address: {profile.address}</Typography>
            </Grid>
          </Grid>
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            textAlign: "center",
            padding: "10px 20px",
          }}
          component={Link}
          to="/update-user"
          state={profile} // Pass the profile data as state
          style={{ textDecoration: "none", color: "white" }}
        >
          Update Profile
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;
