import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export default function LoggedRoutes({ data }) {
  console.log("Response data for checking if user is logged in: ", data);
  return data.loggedIn ? <Outlet /> : <Navigate to="/"></Navigate>;
}
