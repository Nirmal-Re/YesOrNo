import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export default function LoggedRoutes({ data }) {
  return data.loggedIn ? <Outlet /> : <Navigate to="/"></Navigate>;
}
