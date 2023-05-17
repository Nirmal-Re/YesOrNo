import { Navigate, Outlet, useParams } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import ChangePassword from "../pages/authentication/passwordChange";

export default function ChangePasswordRoute() {
  const [passChangeStatus, setPassChangeStatus] = useState({
    passChange: false,
  });

  const { token } = useParams();

  const isChangingPass = async (token) => {
    const url = `http://localhost:4000/isChangingPass/${token}`;
    const response = await axios.get(url);
    console.log("Response", response);
    setPassChangeStatus(response.data);
  };
  isChangingPass(token);
  return passChangeStatus.passChange ? (
    <ChangePassword />
  ) : (
    <Navigate to="/"></Navigate>
  );
}
