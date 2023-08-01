import { Routes, Route } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Index from "./pages";
import Dashboard from "./pages/dashboard";
import About from "./pages/about";
import Contact from "./pages/contact";
import Login from "./pages/authentication/login";
import Register from "./pages/authentication/register";
import NavBar from "./components/navbar";
import LoggedRoutes from "./privateRoute/loggedRoutes";
import UnloggedRoutes from "./privateRoute/unloggedRoutes";
import ChangePasswordRoute from "./privateRoute/changePasswordRoute";
import ChangePassword from "./pages/authentication/changePassword";
import ForgotPassword from "./pages/authentication/fogotPassword";
import "./index.css";

function App() {
  const [userStatus, setUserStatus] = useState({ loggedIn: false });
  const location = useLocation();
  const { REACT_APP_BACKEND_URL } = process.env;

  const isLoggedIn = async () => {
    const url = `${REACT_APP_BACKEND_URL}/isLoggedin`;
    const response = await axios.get(url, { withCredentials: true });
    setUserStatus(response.data);
  };

  const handleLogOut = async () => {
    const url = `http://localhost:4000/logOut`;
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
        <Route element={<LoggedRoutes data={userStatus} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<UnloggedRoutes data={userStatus} />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/" element={<Index />} />
        </Route>
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
