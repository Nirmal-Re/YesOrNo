import { Routes, Route } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Index from "./pages";
import Dashboard from "./pages/dashboard";
import About from "./pages/about";
import Contact from "./pages/contact";
import Profile from "./pages/profile";
import Login from "./pages/authentication/login";
import Register from "./pages/authentication/register";
import NavBar from "./components/navbar";
import LoggedRoutes from "./privateRoute/loggedRoutes";
import UnloggedRoutes from "./privateRoute/unloggedRoutes";
import ChangePasswordRoute from "./privateRoute/changePasswordRoute";
import ChangePassword from "./pages/authentication/changePassword";
import ForgotPassword from "./pages/authentication/forgotPassword";

import "./index.css";

function App() {
  const [userStatus, setUserStatus] = useState();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { REACT_APP_BACKEND_URL } = process.env;

  const isLoggedIn = async () => {
    const URL = `${REACT_APP_BACKEND_URL}/isLoggedin`;
    const response = await axios.get(URL, { withCredentials: true });
    setUserStatus(response.data);
    setLoading(true);
  };

  const handleLogOut = async () => {
    const url = `${REACT_APP_BACKEND_URL}/logOut`;
    const response = await axios.get(url, { withCredentials: true });
    setUserStatus(response.data);
  };

  useEffect(() => {
    isLoggedIn();
  }, [location]);

  return (
    <div>
      <NavBar
        data={userStatus}
        onLogout={handleLogOut}
        style={{ position: "fixed" }}
      />
      <Routes>
        {loading ? (
          <>
            <Route element={<LoggedRoutes data={userStatus} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route element={<UnloggedRoutes data={userStatus} />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/" element={<Index />} />
            </Route>
          </>
        ) : (
          "Loading"
        )}

        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<ChangePasswordRoute />}>
          <Route path="/changePassword/:token" element={<ChangePassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
