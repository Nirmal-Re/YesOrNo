import { Routes, Route } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

import Index from "./pages";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Register from "./pages/register";
import Login from "./pages/login";
import NavBar from "./components/navbar";

function App() {
  const [userStatus, setUserStatus] = useState({ loggedIn: false });

  const isLoggedIn = async () => {
    const url = `http://localhost:4000/isLoggedIn`;
    const response = await axios.get(url, { withCredentials: true });
    setUserStatus(response.data);
  };

  const handleLogOut = async () => {
    console.log("Hello");
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
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
