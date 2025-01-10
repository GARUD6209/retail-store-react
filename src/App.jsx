import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import UpdateProfile from "./Pages/UpdateProfile";
import Navbar from "./components/Navbar";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import ResetPasswordComponent from "./components/ResetPasswordComponent";

function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (token && storedRole) {
      setAuth(true);
      setRole(storedRole);
    } else {
      setAuth(false);
      setRole(null);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setAuth(false);
      setRole(null);
    }
  };

  return (
    <BrowserRouter>
      <Navbar isAdmin={role === "ADMIN"} onLogout={handleLogout} auth={auth} />

      <div className="app-container">
        <Routes>
          <Route
            path="/login"
            element={
              auth ? (
                <Navigate to="/profile" />
              ) : (
                <Login setAuth={setAuth} setRole={setRole} />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPasswordComponent />} />
          <Route
            path="/profile"
            element={auth ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/update-user"
            element={auth ? <UpdateProfile /> : <Navigate to="/login" />}
          />
          {/* UserManagement route */}
          <Route
            path="/user-management"
            element={
              auth && role === "ADMIN" ? (
                <UserManagement />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="*"
            element={auth ? <Profile /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
