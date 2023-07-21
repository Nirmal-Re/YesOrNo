import React, { useEffect, useState } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function ChangePasswordRoute() {
  const [authorised, setAuthorised] = useState({ passChange: false });
  const { token } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    async function fetchData() {
      const url = `${process.env.REACT_APP_BACKEND_URL}/isChangingPass/${token}`;
      const response = await axios.get(url);
      setAuthorised(response.data);
    }
    fetchData();
  }, [location]);

  return authorised.passChange ? <Outlet token={token} /> : "Invalid link";
}
