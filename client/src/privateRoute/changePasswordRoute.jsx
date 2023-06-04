import React, { useEffect, useState } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ChangePasswordRoute() {
  const [authorised, setAuthorised] = useState({ passChange: false });
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const url = `${process.env.REACT_APP_BACKEND_URL}/isChangingPass/${token}`;
      const response = await axios.get(url);
      setAuthorised(response.data);
    }
    fetchData();
  }, []);

  return authorised.passChange ? <Outlet /> : "Invalid link";
}
