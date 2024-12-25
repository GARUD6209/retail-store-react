import axios from "axios";
import { API_URL } from "../config";

// Add token to headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  } else {
    console.log("No token found");
  }
};

// Login request
export const login = async ({ username, password }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, {
      username,
      password,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Register request
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response.data;
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user profile:",
      error.response ? error.response.data : error
    );
    throw error; // Re-throw to handle in component
  }
};

export const updateUserProfile = async (userData) => {
  const hardcodedId = 1; // Replace with the actual hardcoded ID
  const response = await axios.put(
    `${API_URL}/user/${hardcodedId}`,
    userData,
    getAuthHeaders()
  );
  return response.data;
};
