import React, { useEffect, useState } from "react";
import { TextField, MenuItem } from "@mui/material";
import { API_URL } from "../config";
import axios from "axios";

const CityDropdown = ({ value, onChange, label }) => {
  const [cities, setCities] = useState([]); // State to store cities
  const [error, setError] = useState(""); // State to store errors

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${API_URL}/city`);
        console.log(response.data);
        setCities(response.data); // Update the state with the city list
      } catch (err) {
        setError("Failed to fetch cities. Please try again later.");
        console.error(err.message);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = (event) => {
    onChange({
      target: {
        name: "cityId",
        value: event.target.value,
      },
    });
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <TextField
        select
        label={label || "Select City"}
        value={value || ""}
        onChange={handleCityChange}
        fullWidth
        variant="outlined"
        margin="normal"
      >
        <MenuItem value="">
          <em>Select City</em>
        </MenuItem>
        {cities.map((city) => (
          <MenuItem key={city.id} value={city.id}>
            {city.name}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default CityDropdown;
