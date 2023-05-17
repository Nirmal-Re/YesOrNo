import { Routes, Route } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

import Index from "./pages";
import Dashboard from "./pages/dashboard";
import About from "./pages/about";
import Contact from "./pages/contact";
import Register from "./pages/authentication/register";
import Login from "./pages/authentication/login";
import NavBar from "./components/navbar";
import LoggedRoutes from "./privateRoute/loggedRoutes";
import UnloggedRoutes from "./privateRoute/unloggedRoutes";
import ChangePasswordRoute from "./privateRoute/changePasswordRoute";

function App() {
  const [userStatus, setUserStatus] = useState({ loggedIn: false });

  const isLoggedIn = async () => {
    const url = `http://localhost:4000/isLoggedIn`;
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
  }, []);

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
          <Route path="/" element={<Index />} />
        </Route>
        <Route element={<ChangePasswordRoute path="/resetPassword/:token" />} />
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
