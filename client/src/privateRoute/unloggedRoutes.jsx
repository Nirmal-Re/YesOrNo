import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export default function UnloggedRoutes({ data }) {
  return data?.loggedIn ? <Navigate to="/dashboard"></Navigate> : <Outlet />;
}
