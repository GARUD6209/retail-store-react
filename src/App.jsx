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
    if (token) {
      setAuth(true);
      setRole(storedRole);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuth(false);
    setRole("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar isAdmin={role === "USER"} onLogout={handleLogout} />
      <div className="app-container">
        <Routes>
          <Route
            path="/login"
            element={<Login setAuth={setAuth} setRole={setRole} />}
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
          <Route
            path="/user-management"
            element={
              auth && role === "USER" ? (
                <UserManagement />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
